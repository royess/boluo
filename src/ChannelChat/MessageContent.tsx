import React from 'react';
import Prando from 'prando';
import { Entity } from '../entities';
import { ExprEntity } from './ExprEntity';

interface Props {
  text: string;
  entities: Entity[];
  seed?: number[];
}

const makeRng = (seed?: number[]): Prando | undefined => {
  if (seed === undefined || seed.length !== 4) {
    return undefined;
  }
  let a = 0;
  for (const i of seed) {
    a = a * 256 + i;
  }
  return new Prando(a);
};

export const MessageContent: React.FC<Props> = ({ text, entities, seed }) => {
  const content = [];
  for (let key = 0; key < entities.length; key += 1) {
    const entity = entities[key];
    if (entity.type === 'Expr') {
      const rng = makeRng(seed);
      content.push(
        <div key={key} className="inline font-mono border-dashed border-b-2 border-gray-500">
          <ExprEntity node={entity.node} rng={rng} top />
        </div>
      );
    } else if (entity.type === 'Text') {
      content.push(<span key={key}>{text.substr(entity.start, entity.offset)}</span>);
    } else if (entity.type === 'Link') {
      content.push(
        <a key={key} href={entity.href}>
          {text.substr(entity.start, entity.offset)}
        </a>
      );
    } else if (entity.type === 'Strong') {
      content.push(<strong key={key}>{text.substr(entity.start, entity.offset)}</strong>);
    } else if (entity.type === 'Emphasis') {
      content.push(<em key={key}>{text.substr(entity.start, entity.offset)}</em>);
    }
  }
  return <div className="inline break-all">{content}</div>;
};