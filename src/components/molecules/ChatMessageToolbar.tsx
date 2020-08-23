import * as React from 'react';
import ChatItemToolbar from './ChatItemToolbar';
import { useIsAdmin } from '../../hooks/useIsAdmin';
import { ChannelMember } from '../../api/channels';
import editIcon from '../../assets/icons/edit.svg';
import trashIcon from '../../assets/icons/trash.svg';
import foldIcon from '../../assets/icons/fold.svg';
import unfoldIcon from '../../assets/icons/unfold.svg';
import ChatItemToolbarButton from '../atoms/ChatItemToolbarButton';
import { ReactNodeArray, useState } from 'react';
import Dialog from './Dialog';
import { Text } from '../atoms/Text';
import { post } from '../../api/request';
import { throwErr } from '../../utils/errors';
import { useDispatch } from '../../store';
import { css } from '@emotion/core';
import { fontMono, pL, spacingN, textSm } from '../../styles/atoms';
import { primary } from '../../styles/colors';
import { Message } from '../../api/messages';

interface Props {
  myMember?: ChannelMember;
  mine: boolean;
  message: Message;
}

const quoteStyle = css`
  ${[fontMono, textSm, pL(4)]};
  border-left: ${spacingN(1)} solid ${primary['700']};
`;

function ChatMessageToolbar({ myMember, mine, message }: Props) {
  const dispatch = useDispatch();
  const isAdmin = useIsAdmin();
  const [deleteDialog, showDeleteDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const throwE = throwErr(dispatch);
  const deleteMessage = async () => {
    setLoading(true);
    const result = await post('/messages/delete', {}, { id: message.id });
    if (!result.isOk) {
      throwE(result.value);
      setLoading(false);
    }
  };
  const toggleFold = async () => {
    setLoading(true);
    const result = await post('/messages/toggle_fold', {}, { id: message.id });
    if (!result.isOk) {
      throwE(result.value);
    }
    setLoading(false);
  };
  const startEdit = () => {
    dispatch({ type: 'START_EDIT_MESSAGE', message: message });
  };
  const buttons: ReactNodeArray = [];
  if (isAdmin || mine) {
    buttons.push(
      <ChatItemToolbarButton
        key="delete"
        onClick={() => showDeleteDialog(true)}
        disabled={loading}
        sprite={trashIcon}
        title="删除"
      />
    );
  }
  if (myMember?.isMaster) {
    if (message.folded) {
      buttons.push(
        <ChatItemToolbarButton
          key="toggle-fold"
          onClick={toggleFold}
          disabled={loading}
          sprite={unfoldIcon}
          title="取消折叠"
        />
      );
    } else {
      buttons.push(
        <ChatItemToolbarButton
          key="toggle-fold"
          onClick={toggleFold}
          disabled={loading}
          sprite={foldIcon}
          title="标为折叠"
        />
      );
    }
  }
  if (mine) {
    buttons.push(
      <ChatItemToolbarButton key="edit" onClick={startEdit} disabled={loading} sprite={editIcon} title="编辑" />
    );
  }
  if (buttons.length === 0) {
    return null;
  }
  return (
    <React.Fragment>
      <ChatItemToolbar className="show-on-hover">{buttons}</ChatItemToolbar>
      {deleteDialog && (
        <Dialog
          title="删除消息"
          confirmText="删除"
          confirm={deleteMessage}
          dismiss={() => showDeleteDialog(false)}
          mask
        >
          <Text>是否要删除这条消息？</Text>
          <Text css={quoteStyle}>{message.text}</Text>
        </Dialog>
      )}
    </React.Fragment>
  );
}

export default React.memo(ChatMessageToolbar);