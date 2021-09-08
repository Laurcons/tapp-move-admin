import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class BackgroundWorkService {
	private _taskList: string[] = [];
	private _taskListSubject = new BehaviorSubject<string[]>(this._taskList);
	taskList$ = this._taskListSubject.asObservable();

	constructor() {}

	addTask(name: string) {
		this._taskList.push(name);
		this._taskListSubject.next(this._taskList);
	}

	endTask(name: string) {
		this._taskList = this._taskList.filter((t) => t !== name);
		this._taskListSubject.next(this._taskList);
	}
}
