import React, { useState } from 'react';
import { useDispatch, useProfile } from './Provider';
import { post } from '../api/request';
import { throwErr } from '../errors';
import { Space } from '../api/spaces';
import { ConfirmDialog } from './ConfirmDialog';
import { JoinedSpace, LeftSpace } from '../actions/profile';
import { cls } from '../utils';

interface Props {
  space: Space;
  className?: string;
}

export const JoinSpaceButton = React.memo<Props>(({ space, className }) => {
  const [dialog, setDialog] = useState(false);
  const dispatch = useDispatch();
  const profile = useProfile();
  if (profile === undefined) {
    return null;
  }

  const joined = profile.spaces.has(space.id);
  const throwE = throwErr(dispatch);

  const open = () => setDialog(true);
  const close = () => setDialog(false);

  const join = async () => {
    const id = space.id;
    const result = await post('/spaces/join', {}, { id });
    if (result.isOk) {
      dispatch<JoinedSpace>({ type: 'JOINED_SPACE', ...result.value });
    }
  };

  const leave = async () => {
    const id = space.id;
    const result = await post('/spaces/leave', {}, { id });
    if (result.isOk) {
      dispatch<LeftSpace>({ type: 'LEFT_SPACE', id });
    } else {
      throwE(result.value);
    }
    close();
  };

  const handleClick = async () => {
    if (joined) {
      open();
    } else {
      await join();
    }
  };

  return (
    <>
      <button className={cls('btn', className)} onClick={handleClick}>
        {joined ? '退出位面' : '加入位面'}
      </button>
      <ConfirmDialog dismiss={close} submit={leave} open={dialog} confirmText="退出">
        <p className="dialog-title">退出位面</p>
        <p className="my-1">要退出位面「{space?.name}」吗？</p>
      </ConfirmDialog>
    </>
  );
});