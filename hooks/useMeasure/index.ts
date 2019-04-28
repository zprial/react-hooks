/**
 * 监听DOM尺寸变化，并返回该元素的尺寸信息
 */

import React, { useRef, useState, useEffect } from "react";
import ResizeObserver from "resize-observer-polyfill";

export type Measure = [{
  ref: React.MutableRefObject<any>;
}, {
  bottom: number;
  height: number;
  left: number;
  right: number;
  top: number;
  width: number;
  x: number;
  y: number;
}];

export default (initialValue?: any): Measure => {
  // ref 用于指向监听的DOM元素
  const ref = useRef(initialValue);
  // 初始化尺寸值
  const [bounds, set] = useState({ width: 0, height: 0, top: 0, right: 0, bottom: 0, left: 0, x: 0, y: 0 });
  // https://developer.mozilla.org/zh-CN/docs/Web/API/ResizeObserver/ResizeObserver
  // ResizeObserver 接口可以监听到 Element 的内容区域或 SVGElement的边界框改变。
  // 内容区域则需要减去内边距padding
  // 此处只拿第一个也只支持一个DOM元素来进行处理
  // 存储变化后的尺寸信息
  const [ro] = useState(() => new ResizeObserver(([entry]) => {
    set(entry.contentRect);
  }));
  // 开始监听ref指向的DOM元素
  // 或当ref的指向变换之后重新监听新的元素
  useEffect(() => {
    if (ref.current) {
      ro.observe(ref.current);
    }
    return () => ro.disconnect();
  }, [ref.current]);
  return [{ ref }, bounds];
};
