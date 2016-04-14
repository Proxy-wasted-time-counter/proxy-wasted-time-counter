# Proxy Wasted Time Counter

This app use [Multithread-it](https://github.com/Proxy-wasted-time-counter/multithread-it)

## Concept

 - All components are rendered in a service worker to virtual-dom
 - Main thread apply virtual dom into real dom
 - Virtual dom json diffs are send to main thread using postmessages
 - User interactions are emitted to service worker through postmessage using a pivot format
 - Service worker react to  userEvent by sending back a diff to main thread if necessary
 - Each component has 2 part. The one who render vDom in webworker and the one listening events on ui thread.


## DOM events to worker

We have to transmit DOM event to webworker for computation.
Could imagine something like an eventbus.

In the worker Redux will be used to dispatch event as an action
