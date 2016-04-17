import { MultithreadItComponent } from 'multithread-it';

import { persistWastes } from '../../worker/storage';

import { Component as WastedTimeAdder } from './wasted-time-adder';
import { Component as WastesList } from './wastes-list';
import { Component as Counter } from './counter';

export default class Component extends MultithreadItComponent {
  _wastes = [];

  constructor() {
    super();

    this._counter = new Counter();
    this._wastedTimeAdder = new WastedTimeAdder();
    this._wastesList = new WastesList();

  }

  onInit() {
    this.watch(
      state => state.wastedTime.wastes,
      wastes => this._wastes = wastes
    );
    this.watch(
      state => state.wastedTime,
      wastedTime => persistWastes(wastedTime)
    );
    this.watch(
      state => state.counter,
      counter => {
        this._counterValue = counter.value;
        this._counterActive = counter.active;
      }
    );
  }

  render() {
    return (
      <div className="column container">
        <div className="box">
          <p>
            {this._counter.render(this._counterActive, this._counterValue)}
          </p>
        </div>
        <div className="box">
          <p>
            {this._wastedTimeAdder.render()}
          </p>
        </div>
        <div className="box">
          <p>
            {this._wastesList.render(this._wastes)}
          </p>
        </div>
      </div>
    );
  }
}
