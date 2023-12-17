const useConvertStringToDate = (mongoDateString?: string): string => {
  if (mongoDateString) {
    const jsDate = new Date(mongoDateString);
    return jsDate.toLocaleString('de-DE', {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
      hour: undefined,
      minute: undefined,
      hour12: false,
    }) + ' - ' + jsDate.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit', hour12: false });
  }
  return ''
};

export default useConvertStringToDate;
