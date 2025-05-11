import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';

import { usePopper } from 'react-popper';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Dropdown = forwardRef((props: any, forwardedRef) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [visibility, setVisibility] = useState<any>(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const referenceRef = useRef<any>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const popperRef = useRef<any>();

  const { styles, attributes } = usePopper(referenceRef.current, popperRef.current, {
    placement: props.placement || 'bottom-end',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: props.offset || [0],
        },
      },
    ],
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDocumentClick = (event: any) => {
    if (referenceRef.current?.contains(event.target) || popperRef.current?.contains(event.target)) {
      return;
    }

    setVisibility(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleDocumentClick);
    return () => {
      document.removeEventListener('mousedown', handleDocumentClick);
    };
  }, []);

  useImperativeHandle(forwardedRef, () => ({
    close() {
      setVisibility(false);
    },
  }));

  return (
    <>
      <button
        ref={referenceRef}
        type="button"
        className={props.btnClassName}
        onClick={() => setVisibility(!visibility)}
      >
        {props.button}
      </button>

      <div
        ref={popperRef}
        style={styles.popper}
        {...attributes.popper}
        className="z-50"
        onClick={() => setVisibility(!visibility)}
      >
        {visibility && props.children}
      </div>
    </>
  );
});
