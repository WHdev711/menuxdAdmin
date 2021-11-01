import React, { useState, Fragment,useEffect } from 'react'
import { Badge } from 'reactstrap'
const daysOptions = [
  {
    en: 'Monday',
    es: 'Lunes',
    value: 'monday',
    active: false
  },
  {
    en: 'Tuesday',
    es: 'Martes',
    value: 'tuesday',
    active: false
  },
  {
    en: 'Wednesday',
    es: 'Miércoles',
    value: 'wednesday',
    active: false
  },
  {
    en: 'Thursday',
    es: 'Jueves',
    value: 'thursday',
    active: false
  },
  {
    en: 'Friday',
    es: 'Viernes',
    value: 'friday',
    active: false
  },
  {
    en: 'Saturday',
    es: 'Sábado',
    value: 'saturday',
    active: false
  },
  {
    en: 'Sunday',
    es: 'Domingo',
    value: 'sunday',
    active: false
  },
]

const SelectDays = ({ days = [], updateDays, locale }) => {
  const [selectedDays, setSelectedDays] = useState(daysOptions.map(d => {
    if (days.includes(d.value)) {
      d.active = true
    }else{
      d.active = false
    }

    return d
  }))

  const change = (id) => {
    setSelectedDays(selectedDays.map((d, i) => {
      if (id === i) {
        d.active = !d.active
      }

      return d
    }))

    updateDays(selectedDays.filter(d => d.active).map(d => d.value))
  }
  

  return (
    <Fragment>
      {
        selectedDays.map((i, n) => (
          <Badge
            style={{ cursor: 'pointer' }}
            onClick={() => change(n)}
            key={n}
            color={i.active ? 'primary' : ''}
            className="mb-1 mr-1"
          >
            {i[locale]}
          </Badge>
        ))
      }
    </Fragment >
  )
}

export default SelectDays