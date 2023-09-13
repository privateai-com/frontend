/* eslint-disable jsx-a11y/click-events-have-key-events */
import { memo, useCallback, useState } from 'react';
import cx from 'classnames';
import styles from './styles.module.scss';
import { Typography } from '../Typography';

type Tab = {
  key: string,
  label: string,
  component: React.ReactNode,
};

type TabsProps = {
  tabs: Tab[],
  defaultKey: string,
  panelClassName?: string,
  labelClassName?: string,
  componentClassName?: string,
};

const Tabs = memo(({
  defaultKey,
  tabs,
  panelClassName,
  labelClassName,
  componentClassName,
}: TabsProps) => {
  const [activeTab, setActiveTab] = useState(defaultKey);

  const onClickTab = useCallback((key: string) => {
    setActiveTab(key);
  }, []);

  return (
    <div className={styles.tabs_container}>
      <nav className={cx(styles.tabs__panel_container, panelClassName)}>
        {tabs.map(({ key, label }) => (
          <div
            className={cx(
              styles.panel__tab_item,
              { [styles.tab_active]: activeTab === key },
            )}
            key={`tabs_item_${key}`}
            onClick={() => onClickTab(key)}
            role="tab"
            tabIndex={0}
          >
            <Typography type="h6" className={labelClassName}>
              {label}
            </Typography>
          </div>
        ))}
      </nav>
      {tabs.map(({ key, component }) => (
        <section
          className={cx(
            activeTab === key ? styles.tabs__tab_container : styles.tab_hidden,
            componentClassName,
          )}
          key={`tab_${key}`}
        >
          {component}
        </section>
      ))}
    </div>
  );
});

export { Tabs };
