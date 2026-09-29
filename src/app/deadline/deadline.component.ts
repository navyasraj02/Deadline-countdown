import {
    ChangeDetectionStrategy,
    Component,
    DestroyRef,
    NgZone,
    signal,
    inject,
  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-deadline',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    template:`
        @if (error()){
        <p>Unable to load the deadline.</p>
        } @else if (secondsLeft() === null){
        <p>Loading...</p>
        } @else {
        <p>Seconds left to deadline: {{ secondsLeft() }}</p>
        }
    `
})
export class DeadlineComponent {
    private readonly http = inject(HttpClient);
    private readonly destroyRef = inject(DestroyRef);
    private readonly zone = inject(NgZone);

    private timerId?: ReturnType<typeof setInterval>;

    readonly secondsLeft = signal<number | null>(null);
    readonly error = signal(false);

    constructor() {
        this.destroyRef.onDestroy(() => {
            clearInterval(this.timerId);
          });

        this.http
        .get<{ secondsLeft: number }>('/api/deadline')
        .pipe(takeUntilDestroyed())
        .subscribe({
            next: (response) => {
                this.startCountDown(response.secondsLeft);
            },
            error: () => {
                this.error.set(true);
            },
        });
    }

    private startCountDown(initialSeconds: number): void {
        if (!Number.isFinite(initialSeconds)) {
            this.error.set(true);
            return;
        }

        const targetTime = Date.now() + initialSeconds * 1000;

        const update = () => {
            const remaining = Math.max(
                0,
                Math.ceil((targetTime - Date.now()) / 1000)
            );

            if (remaining !== this.secondsLeft()) {
                this.zone.run(() => {
                    this.secondsLeft.set(remaining);
                });
            }

            if (remaining === 0) {
                clearInterval(this.timerId);
            }
        };

        update();

        if (this.secondsLeft() === 0){
            return;
        }

        this.zone.runOutsideAngular(() => {
            this.timerId = setInterval(update, 1000);
        });
    }
}