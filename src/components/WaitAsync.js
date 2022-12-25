import React, { useEffect, useImperativeHandle, useState } from "react";
import Loading from "./Loading";

const WaitAsync = React.forwardRef(
  ({ func = async () => {}, check = false, children }, ref) => {
    useImperativeHandle(ref, () => ({
      setLoading,
    }));
    const [loading, setLoading] = useState(true);
    const [show, setShow] = useState(!check);

    const load = async () => {
      const result = await func();
      if (check) {
        setShow(result);
      }
      setLoading(false);
    };

    useEffect(() => {
      load();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return <>{loading ? <Loading /> : show ? children : <></>}</>;
  }
);

export default WaitAsync;
