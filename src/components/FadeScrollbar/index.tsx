import React, {
  FunctionComponent,
  HTMLAttributes,
  ReactChild,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import "./styles.css";
import IconButton from '@mui/material/IconButton';

 import { IconType } from "react-icons/lib";
import {
  IoIosArrowBack,
  IoIosArrowDown,
  IoIosArrowForward,
  IoIosArrowUp,
} from "react-icons/io";
type ScrollPos = "start" | "middle" | "end" | "noScroll";
type CommonProps = {
  arrowContainerBg: string;
  children: React.ReactChild;

  iconButtonProps?: Parameters<typeof IconButton>[0];
  iconProps?: Parameters<IconType>[0];
} & HTMLAttributes<HTMLDivElement>;
export const FadeScrollbarHorizontal: FunctionComponent<
  CommonProps & {
    leftIcon?: IconType;
    rightIcon?: IconType;

    leftElementOverride?: ReactChild;
    rightElementOverride?: ReactChild;
  }
> = ({
  arrowContainerBg,
  children,
  leftIcon,
  rightIcon,

  leftElementOverride,
  rightElementOverride,
  iconProps,
  iconButtonProps,
  ...restAttrs
}) => {
  const [hScrollPos, setHScrollPos] = useState<ScrollPos>("noScroll");
  const ref = useRef<HTMLDivElement>(null);
  const el = ref.current?.children[0];
  const calculateHScrollPos = (el: Element) => {
    if (el.scrollWidth === (el as any).offsetWidth) {
      setHScrollPos("noScroll");
    } else if (el.scrollLeft >= 0) {
      setHScrollPos("start");
    } else if (-el.scrollLeft + (el as any).offsetWidth >= el.scrollWidth - 1) {
      setHScrollPos("end");
    } else {
      setHScrollPos("middle");
    }
  };
  useEffect(() => {
    const handleScroll = (e: any) => calculateHScrollPos(e.target);
    if (el && el instanceof Element) {
      calculateHScrollPos(el);

      el.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (el) el.removeEventListener("scroll", handleScroll);
    };
  }, [el]);
  useEffect(() => {
    if (ref && ref.current) {
      const observer = new ResizeObserver(() => {
        let el = ref.current?.children[0];
        if (el) calculateHScrollPos(el);
      });
      const mutationObserver = new MutationObserver(() => {
        let el = ref.current?.children[0];
        if (el) calculateHScrollPos(el);
      });
      observer.observe(ref.current);
      mutationObserver.observe(ref.current, {
        subtree: true,
        childList: true,

        characterData: true,
      });
    }
  }, []);
  const linearGradientToLeft = `
  linear-gradient(270deg, rgba(0,0,0,0) 0%, ${arrowContainerBg} 100%)`;
  const linearGradientToRight = `
  linear-gradient(90deg, rgba(0,0,0,0) 0%, ${arrowContainerBg} 100%)`;
  return (
    <div
      ref={ref}
      {...restAttrs}
      className={
        "root-arrow-scrollbar root-arrow-scrollbar-horizontal " +
        restAttrs.className
      }
    >
      {children}
      {hScrollPos !== "noScroll" && (
        <>
          {" "}
          <span
            className={`arrow-container arrow-container-horizontal arrow-container-horizontal-left ${
              hScrollPos === "middle" || hScrollPos === "start"
                ? ""
                : "arrow-container-hidden"
            }`}
            style={{
              background: linearGradientToLeft,
            }}
            onClick={() => {
              el?.scrollTo({
                behavior: "smooth",
                top: 0,
                left: el.scrollLeft - (el as any).offsetWidth / 2,
              });
            }}
          >
            <span className="arrow">
              {leftElementOverride ?? (
                <IconButton size="small" {...iconButtonProps}>
                  {" "}
                  {React.createElement(leftIcon ?? IoIosArrowBack, iconProps)}
                </IconButton>
              )}
            </span>
          </span>
          <span
            className={`arrow-container arrow-container-horizontal arrow-container-horizontal-right ${
              hScrollPos === "middle" || hScrollPos === "end"
                ? ""
                : "arrow-container-hidden"
            }`}
            onClick={() => {
              el?.scrollTo({
                behavior: "smooth",
                top: 0,
                left: el.scrollLeft + (el as any).offsetWidth / 2,
              });
            }}
            style={{ background: linearGradientToRight }}
          >
            <span className="arrow">
              {rightElementOverride ?? (
                <IconButton size="small" {...iconButtonProps}>
                  {" "}
                  {React.createElement(
                    rightIcon ?? IoIosArrowForward,
                    iconProps
                  )}
                </IconButton>
              )}
            </span>
          </span>
        </>
      )}
    </div>
  );
};

export const FadeScrollbarVertical: FunctionComponent<
  CommonProps & {
    topIcon?: IconType;
    bottomIcon?: IconType;

    topElementOverride?: ReactChild;
    bottomElementOverride?: ReactChild;
  }
> = ({
  arrowContainerBg,
  children,
  topIcon,
  bottomIcon,
  topElementOverride,
  bottomElementOverride,
  iconProps,
  iconButtonProps,
  ...restAttrs
}) => {
  const [vScrollPos, setVScrollPos] = useState<ScrollPos>("noScroll");
  const ref = useRef<HTMLDivElement>(null);
  const el = ref.current?.children[0];
  const calculateVScrollPos = (el: Element) => {
    if (el.scrollHeight === (el as any).offsetHeight) {
      setVScrollPos("noScroll");
    } else if (el.scrollTop <= 0) {
      setVScrollPos("start");
    } else if (el.scrollTop + (el as any).offsetHeight >= el.scrollHeight - 1) {
      setVScrollPos("end");
    } else {
      setVScrollPos("middle");
    }
  };
  useEffect(() => {
    const handleScroll = (e: any) => calculateVScrollPos(e.target);
    if (el && el instanceof Element) {
      calculateVScrollPos(el);
      el.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (el) el.removeEventListener("scroll", handleScroll);
    };
  }, [el]);
  useEffect(() => {
    if (ref && ref.current) {
      const observer = new ResizeObserver(() => {
        let el = ref.current?.children[0];
        if (el) calculateVScrollPos(el);
      });
      const mutationObserver = new MutationObserver(() => {
       
        let el = ref.current?.children[0];
        if (el) calculateVScrollPos(el);
      });
      observer.observe(ref.current);
      mutationObserver.observe(ref.current, {
        subtree: true,
        childList: true,
        characterData: true,
      });
    }
  }, []);

  const linearGradientToTop = `
  linear-gradient(0deg, rgba(0,0,0,0) 0%, ${arrowContainerBg} 100%)`;
  const linearGradientToBottom = `
  linear-gradient(180deg, rgba(0,0,0,0) 0%, ${arrowContainerBg} 100%)`;
  return (
    <div
      ref={ref}
      {...restAttrs}
      className={
        "root-arrow-scrollbar root-arrow-scrollbar-vertical " +
        restAttrs.className
      }
    >
      {children}

      {vScrollPos !== "noScroll" && (
        <>
          {" "}
          <span
            className={`arrow-container arrow-container-vertical arrow-container-vertical-bottom ${
              vScrollPos === "middle" || vScrollPos === "start"
                ? ""
                : "arrow-container-hidden"
            }`}
            style={{
              background: linearGradientToBottom,
            }}
            onClick={() => {
              el?.scrollTo({
                behavior: "smooth",
                top: el.scrollTop + (el as any).offsetHeight / 2,
                left: 0,
              });
            }}
          >
            <span className="arrow">
              {bottomElementOverride ?? (
                <IconButton size="small" {...iconButtonProps}>
                  {" "}
                  {React.createElement(bottomIcon ?? IoIosArrowDown, iconProps)}
                </IconButton>
              )}
            </span>
          </span>
          <span
            className={`arrow-container arrow-container-vertical arrow-container-vertical-top ${
              vScrollPos === "middle" || vScrollPos === "end"
                ? ""
                : "arrow-container-hidden"
            }`}
            onClick={() => {
              el?.scrollTo({
                behavior: "smooth",
                top: el.scrollTop - (el as any).offsetHeight / 2,
                left: 0,
              });
            }}
            style={{ background: linearGradientToTop }}
          >
            <span className="arrow">
              {topElementOverride ?? (
                <IconButton size="small" {...iconButtonProps}>
                  {" "}
                  {React.createElement(topIcon ?? IoIosArrowUp, iconProps)}
                </IconButton>
              )}
            </span>
          </span>
        </>
      )}
    </div>
  );
};
