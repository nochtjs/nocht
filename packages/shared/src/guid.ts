let guid = 0;

export function getGuid(increment = true) {
    if (increment) guid += 1;
        return guid;
}