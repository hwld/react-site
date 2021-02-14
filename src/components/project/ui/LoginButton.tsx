import { Typography } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';

type Props = {
  imgSrc: string;
  imgAlt: string;
  onClick: () => void;
  className?: string;
};

const Component: React.FC<Props> = ({
  children,
  imgSrc,
  imgAlt,
  onClick,
  className,
}) => {
  return (
    <button className={className} type="button" onClick={onClick}>
      <span className="iconField">
        <img className="icon" src={imgSrc} alt={imgAlt} />
      </span>
      <span className="textField">
        <Typography className="text">{children}</Typography>
      </span>
    </button>
  );
};

const StyledComponent = styled(Component)`
  outline: none;
  display: inline-block;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  background-color: #fff;
  width: 230px;
  height: 40px;
  padding: 8px 16px;

  &:hover,
  &:focus {
    background-color: #ffffffe0;
  }

  & > .iconField {
    display: table-cell;
    vertical-align: middle;

    & > .icon {
      padding-top: 2px;
      width: 20px;
    }
  }

  & > .textField {
    padding-left: 10px;
    display: table-cell;
    vertical-align: middle;
    font-size: 14px;

    & > .text {
      white-space: nowrap;
      font-weight: medium;
      color: #757575;
    }
  }
`;

export const LoginButton = StyledComponent;
