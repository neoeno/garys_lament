import RxDOM from 'rx-dom';
const rafScheduler = RxDOM.Scheduler.requestAnimationFrame;

let makeScheduler = (baseTimeout) => {
  return {
    first: (fn) => (fn(),
                    makeScheduler(baseTimeout)),
    wait: (timeout) => makeScheduler(baseTimeout + timeout),
    then: (fn) => (rafScheduler.scheduleFuture(null, baseTimeout, fn),
                   makeScheduler(baseTimeout))
  };
};

export default makeScheduler(0);
