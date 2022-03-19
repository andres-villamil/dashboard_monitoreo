let lastId = 0;

export default function(prefix='') {
    lastId++;
    return `${prefix}${lastId}`;
}

export function resetIdCounter () { lastId = 0 }