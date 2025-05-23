export class Box {
  x: number
  y: number
  width: number
  height: number

  constructor ({ x, y, width, height }: {
    x: number
    y: number
    width: number
    height: number
  }) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
  }

  get top () { return this.y }
  get bottom () { return this.y + this.height }
  get left () { return this.x }
  get right () { return this.x + this.width }
}

export function getOverflow (a: Box, b: Box) {
  return {
    x: {
      before: Math.max(0, b.left - a.left),
      after: Math.max(0, a.right - b.right),
    },
    y: {
      before: Math.max(0, b.top - a.top),
      after: Math.max(0, a.bottom - b.bottom),
    },
  }
}

export function getTargetBox (target: HTMLElement | [x: number, y: number]): Box {
  if (Array.isArray(target)) {
    return new Box({
      x: target[0],
      y: target[1],
      width: 0,
      height: 0,
    })
  } else {
    return target.getBoundingClientRect()
  }
}

export function getElementBox (el: HTMLElement) {
  if (el === document.documentElement) {
    if (!visualViewport) {
      return new Box({
        x: 0,
        y: 0,
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
      })
    } else {
      return new Box({
        x: visualViewport.scale > 1 ? 0 : visualViewport.offsetLeft,
        y: visualViewport.scale > 1 ? 0 : visualViewport.offsetTop,
        width: visualViewport.width * visualViewport.scale,
        height: visualViewport.height * visualViewport.scale,
      })
    }
  } else {
    const rect = el.getBoundingClientRect()
    return new Box({
      x: rect.x,
      y: rect.y,
      width: el.clientWidth,
      height: el.clientHeight,
    })
  }
}
