import React, { useState } from 'react'
import { Input, Select, Switch, Space, Tooltip } from 'antd'
import { css, cx } from '@emotion/css'

import { StarOutlined, StarFilled } from '@ant-design/icons'

import _ from 'lodash'

const { Search } = Input
const { Option } = Select

const Filters = ({ onSearch, onTypeChange, onSwitchChange }) => {
  const [type, setType] = useState('patient')

  const handleChangeType = t => {
    setType(t)
    onTypeChange(t)
  }

  const debounced = _.debounce(e => onSearch(e.target.value), 300)

  return (
    <div className={cx('center', css`width: 100%`)}>
      <Space className={css`width: fit-content;`} align="center">
        <Input.Group compact>
          <Select style={{ width: 150 }} defaultValue={type} onChange={handleChangeType}>
            <Option value="patient">Patient</Option>
            <Option value="téléphone">Téléphone</Option>
            <Option value="email">Email</Option>
          </Select>
          <Search placeholder={`Rechercher par ${type}`} style={{ width: 250 }} onSearch={q => onSearch(q)} allowClear onChange={debounced} />
        </Input.Group>
        <Tooltip placement="bottom" title="favoris">
          <Switch
            checkedChildren={<StarFilled />}
            unCheckedChildren={<StarOutlined />}
            onChange={onSwitchChange}
          />
        </Tooltip>
      </Space>
    </div>
  )
}

export default Filters