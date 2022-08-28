import { memo } from 'react';
import QuickPanel from '../../shared-components/quickPanel/QuickPanel';
import ChatPanel from '../../shared-components/chatPanel/ChatPanel';

function RightSideLayout3() {
  return (
    <>
      <ChatPanel />

      <QuickPanel />
    </>
  );
}

export default memo(RightSideLayout3);
