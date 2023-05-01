import moment from 'moment';

export const formatDate = (dateNum: string | number, isDue = false): string => {
  if (isDue) {
    return moment(dateNum).format('YYYY-MM-DD HH:mm:ss');
  } else {
    return moment(dateNum).format('YYYY-MM-DD HH:mm:ss');
  }
};

export const getDay = (date: Date = new Date()): string => {
  return moment(date).format('YYYYMMDD');
};

export const getTime = (): number => {
  return new Date().getTime();
};

export const birthdayYear = (date: Date): string | null => {
  try {
    return date ? `${moment().diff(date, 'years')}` : null;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const dueDateMillisecond = (date: string): number => {
  const currentTime = Number.parseInt(String(new Date().getTime() / 1000));
  const futureTime = Number.parseInt(String(new Date(date).getTime() / 1000));
  if (futureTime <= currentTime) {
    return 0;
  } else {
    return (futureTime - currentTime) * 1000;
  }
};
