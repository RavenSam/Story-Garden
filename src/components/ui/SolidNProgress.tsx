import { useIsRouting } from "solid-start"
import * as NProgress from "nprogress"
import { createEffect, mergeProps } from "solid-js"

interface SolidNProgressProps {
   color?: string
   height?: number
   spinner?: boolean
}

export default function SolidNProgress(props: SolidNProgressProps) {
   const isRouting = useIsRouting()
   const { color, height, spinner } = mergeProps({ color: "#10b981", height: 3, spinner: false }, props)

   createEffect(() => (isRouting() ? NProgress.start() : NProgress.done()))
   return (
      <style>{`
   #nprogress {
    pointer-events: none;
    position:relative;
    z-index: 9999;
  }
  #nprogress .bar {
    background: ${color};
    position: fixed;
    z-index: 9999;
    top: 0;
    left: 0;
    width: 100%;
    height: ${height}px;
  }
  #nprogress .peg {
    display: block;
    position: absolute;
    z-index: 9999;
    right: 0px;
    width: 100px;
    height: 100%;
    box-shadow: 0 0 10px ${color}, 0 0 5px ${color};
    opacity: 1;
    -webkit-transform: rotate(3deg) translate(0px, -4px);
    -ms-transform: rotate(3deg) translate(0px, -4px);
    transform: rotate(3deg) translate(0px, -4px);
  }
  #nprogress .spinner {
    display: ${spinner ? "block" : "none"};
    position: fixed;
    z-index: 1031;
    top: 15px;
    right: 15px;
  }
  #nprogress .spinner-icon {
    width: 18px;
    height: 18px;
    box-sizing: border-box;
    border: solid 2px transparent;
    border-top-color: ${color};
    border-left-color: ${color};
    border-radius: 50%;
    -webkit-animation: nprogresss-spinner 400ms linear infinite;
    animation: nprogress-spinner 400ms linear infinite;
  }
  .nprogress-custom-parent {
    overflow: hidden;
    position: relative;
    z-index: 9999;
  }
  .nprogress-custom-parent #nprogress .spinner,
  .nprogress-custom-parent #nprogress .bar {
    position: absolute;
    z-index: 9999;

  }
  @-webkit-keyframes nprogress-spinner {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }
  @keyframes nprogress-spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
   
   `}</style>
   )
}
