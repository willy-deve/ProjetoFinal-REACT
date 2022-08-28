import { memo } from 'react';
import ChatPanel from '../../shared-components/chatPanel/ChatPanel';
import QuickPanel from '../../shared-components/quickPanel/QuickPanel';

function RightSideLayout2() {
  return (
    <>
      <ChatPanel />

      <QuickPanel />
    </>
  );
}

export default memo(RightSideLayout2);
