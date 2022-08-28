import { memo } from 'react';
import QuickPanel from '../../shared-components/quickPanel/QuickPanel';

function RightSideLayout1(props) {
  return (
    <>
      {/* <ChatPanel /> */}

      <QuickPanel />
    </>
  );
}

export default memo(RightSideLayout1);
