// partially taken from https://github.com/hediet/ts-std/blob/master/src/disposable.ts

interface Disposable {
	dispose(): void;
}

export function dispose(disposable: Disposable | Disposable[] | undefined) {
	if (!disposable) {
		return;
	}
	if (Array.isArray(disposable)) {
		for (var d of disposable) { d.dispose(); }
	} else {
		disposable.dispose();
	}
}

export class DisposableComponent implements Disposable {
	private disposables: Disposable[] = [];

	public addDisposable(disposable: Disposable) {
		this.disposables.push(disposable);
	}

	public dispose() {
		dispose(this.disposables);
	}
	public clear() {
        this.dispose();
        this.disposables = [];
	}
}