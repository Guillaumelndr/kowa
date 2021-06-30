import React, { useState } from 'react'
import { Input, Select } from 'antd'
import { css } from '@emotion/css'

const { Search } = Input
const { Option } = Select

const Filters = ({ onSearch, onTypeChange }) => {
  const [type, setType] = useState('patient')

  const handleChangeType = t => {
    setType(t)
    onTypeChange(t)
  }

  return (
    <div className={css`width: 400px;`}>
      <Input.Group compact>
        <Select style={{ width: 150 }} defaultValue={type} onChange={handleChangeType}>
          <Option value="patient">Patient</Option>
          <Option value="téléphone">Téléphone</Option>
          <Option value="email">Email</Option>
        </Select>
        <Search placeholder={`Rechercher par ${type}`} style={{ width: 250 }} onSearch={q => onSearch({ q, type })} />
      </Input.Group>
    </div>
  )
}

export default Filters