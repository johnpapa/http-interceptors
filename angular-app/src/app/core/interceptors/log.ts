export function log(group: string, messages: string[], tables?: any[]) {
  console.groupCollapsed(group);
  messages.forEach((m) => console.log(m));
  if (tables?.length) {
    tables.forEach((t) => console.table(t));
  }
  console.groupEnd();
}

export function logError(group: string, messages: string[], tables?: any[]) {
  console.groupCollapsed(group);
  messages.forEach((m) => console.error(m));
  if (tables?.length) {
    tables.forEach((t) => console.table(t));
  }
  console.groupEnd();
}
