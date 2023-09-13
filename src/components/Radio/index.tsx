import React, { FC, ChangeEvent } from 'react';
import cx from 'classnames';
import Form from 'react-bootstrap/Form';
import styles from './styles.module.scss';

interface RadioProps {
  className?: string,
  nameGroup?: string,
  label: string,
  onChange: (e: ChangeEvent) => void,
  checked?: boolean,
}

export const Radio: FC<RadioProps> = ({ 
  className = '', nameGroup = '', label, onChange, checked,
}) => (
  <Form.Check
    type="radio"
    id="custom-switch"
    label={label}
    name={nameGroup}
    className={cx(styles.radio, className)}
    onChange={onChange}
    checked={checked}
  />
);
