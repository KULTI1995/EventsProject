import { map} from "rxjs/operators";
import { EventClass } from "../../event/EventClass";


const getDatFromTo = (dataString) => {
  const regExp = /^(\d){1,}:(\d){1,}$/;
  const testRegExp = regExp.test(dataString);

  const toDaygetTime = new Date().getTime();
  const toDaygetDay = new Date().getDay();

  let dayTo = null;
  let dayFrom = null;

  const OneDayTime = 1000 * 60 * 60 * 24;

  // 2 regexp
  const regExp2 = /^(\d){1,}\+(\d){1,}:(\d){1,}$/;
  const testRegExp2 = regExp2.test(dataString);
  if (testRegExp2) {
    const splitTime = dataString.split(':');
    // day to - how days added, to now dey.
    splitTime[1] = Number(splitTime[1]);

    const splitTimePlus = splitTime[0].split('+');
    // day from - now day
    splitTimePlus[0] = Number(splitTimePlus[0]);
    // how days added, to now dey.
    splitTimePlus[1] = Number(splitTimePlus[1]);

    if (splitTimePlus[0] === 0) {
      dayFrom = toDaygetTime + (splitTimePlus[1] * OneDayTime);
      dayTo = (dayFrom + (splitTime[1] * OneDayTime))
    }

    return { from: new Date(dayFrom), to: new Date(dayTo) }
  } else if (testRegExp) {
    const splitTime = dataString.split(':');
    splitTime[0] = Number(splitTime[0]);
    splitTime[1] = Number(splitTime[1]);

    if (splitTime[0] === 0 || splitTime[0] === toDaygetDay) {
      dayFrom = toDaygetTime;
      dayTo = (toDaygetTime + (splitTime[1] * OneDayTime))
    } else {
      if (splitTime[0] < toDaygetDay) {
        const diffDay = toDaygetDay - splitTime[0]
        dayFrom = (toDaygetTime - diffDay * OneDayTime);
        dayTo = (dayFrom + ((splitTime[1] - 1) * OneDayTime))
      } else if (splitTime[0] > toDaygetDay) {
        const diffDay = splitTime[0] - toDaygetDay
        dayFrom = (toDaygetTime + diffDay * OneDayTime)
        dayTo = (dayFrom + ((splitTime[1] - 1) * OneDayTime));
      }
    }
    return { from: new Date(dayFrom), to: new Date(dayTo) }
  } else {
    console.log('error syntax...')
    return null;
  }
}







export let filters = {
  getEventByTime: dataString => {
    return map((events: EventClass[]) =>
      events.filter((event: EventClass) => {
        const patt = /^(\d){1,}:(\d){1,}$/;
        const patt0 = /^(\d){1,}\+(\d){1,}:(\d){1,}$/;
        const patt2 = /^\*\d:\d$/;

        if (patt.test(dataString) || patt0.test(dataString)) {
          const dateFromTo = getDatFromTo(dataString)
          console.log(dateFromTo);
          return ((new Date(event.date.start) >= dateFromTo.from) && (new Date(event.date.end) <= dateFromTo.to));
        } else if (patt2.test(dataString)) {
          const splitTime = dataString.split(':');
          const deletePlus = splitTime[0].replace('*', '')

          const datFrom = Number(deletePlus);
          const dayTo = Number(splitTime[1]);

          const dayFromEvent = new Date(event.date.start).getDay();
          const datToEvent = new Date(event.date.end).getDay();
          if ((dayFromEvent >= datFrom) && (datToEvent >= dayFromEvent && datToEvent <= dayTo)) {
            console.log(dayFromEvent, datFrom, datToEvent, dayTo);
          }

          return ((dayFromEvent >= datFrom) && (datToEvent >= dayFromEvent && datToEvent <= dayTo));
        } else {
          return null;
        }
      })
    )
  },
  getEventByCategory: category => {
    return map((events: EventClass[]) =>
      events.filter((event: EventClass) => event.category === category)
    )
  },
  getEventByTitle: (title:string) => {
    return map((events: EventClass[]) =>
      events.filter((event: EventClass) => {
        return new RegExp(title.toLowerCase()).test(event.title.toLowerCase());
      })
    )
  }
}