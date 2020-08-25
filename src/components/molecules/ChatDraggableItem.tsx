import * as React from 'react';
import { ChannelMember } from '../../api/channels';
import { Draggable, DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import ItemSwitch from './ItemSwitch';
import { css } from '@emotion/core';
import { black } from '../../styles/colors';
import { MessageItem, PreviewItem } from '../../states/chat-item-set';

interface Props {
  index: number;
  item: PreviewItem | MessageItem | undefined;
  myMember: ChannelMember | undefined;
  placeholder?: boolean;
  provided?: DraggableProvided;
  snapshot?: DraggableStateSnapshot;
}

const dragging = css`
  filter: brightness(200%);
  box-shadow: 1px 1px 2px ${black};
`;

function ChatDraggableItem({ index, item, myMember, provided, snapshot, placeholder = false }: Props) {
  const itemIndex = index - 1;

  const draggable = item?.type === 'MESSAGE' && (item.mine || myMember?.isMaster);
  const id = item?.id || myMember?.userId || 'UNEXPECTED';
  const renderer = (provided: DraggableProvided, snapshot?: DraggableStateSnapshot) => {
    const style = snapshot?.isDragging ? dragging : {};
    return (
      <div ref={provided.innerRef} {...provided.draggableProps} css={style}>
        {placeholder ? (
          <div style={{ height: 120 }} />
        ) : (
          <ItemSwitch item={item} myMember={myMember} handleProps={provided.dragHandleProps} />
        )}
      </div>
    );
  };
  if (provided) {
    return renderer(provided, snapshot);
  }
  return (
    <Draggable draggableId={id} index={itemIndex} key={id} isDragDisabled={!draggable}>
      {renderer}
    </Draggable>
  );
}

export default React.memo(ChatDraggableItem);