import { LeftOutlined, RightOutlined } from '@ant-design/icons'

type CatalogProps = {
  page: number
  total: number
  setPage: (arg0: number) => void
  className?: string
}

export default function Catalog({
  page,
  total,
  setPage,
  className = '',
}: CatalogProps) {
  const shownNumbers = []
  let showStart = false
  let showEnd = false

  const totalPages = Math.ceil(total / 4)

  if (totalPages < 5) {
    for (let i = 1; i <= totalPages; i++) {
      shownNumbers.push(i)
    }
  } else if (page <= 3) {
    shownNumbers.push(2, 3, 4)
    showEnd = true
  } else if (page >= totalPages - 3) {
    for (let i = totalPages - 3; i < totalPages; i++) {
      shownNumbers.push(i)
    }
    showStart = true
  } else {
    shownNumbers.push(page - 1, page, page + 1)
    showEnd = true
    showStart = true
  }

  return (
    <ul className={`list-none flex hover:cursor-pointer text-sm ${className}`}>
      <li className='px-2 flex items-center w-8'>
        {totalPages > 6 && page > 1 && (
          <LeftOutlined
            data-testid='left-arrow'
            onClick={() => setPage(page - 1)}
          />
        )}
      </li>

      {totalPages >= 5 && (
        <NumberItem item={1} current={page} onClick={() => setPage(1)} />
      )}

      {showStart && <li data-testid='left-dots'>...</li>}

      {shownNumbers.map((item) => (
        <NumberItem
          key={`catalog-item-${item}`}
          current={page}
          item={item}
          onClick={() => setPage(item)}
        />
      ))}

      {showEnd && totalPages > 6 && <li data-testid='right-dots'>...</li>}

      {totalPages > 6 && (
        <NumberItem
          item={totalPages}
          current={page}
          data-testid={`catalog-item-${totalPages}`}
          onClick={() => setPage(totalPages)}
        />
      )}

      <li className='px-2 flex items-center w-8'>
        {totalPages > 6 && page < totalPages && (
          <RightOutlined
            data-testid='right-arrow'
            onClick={() => setPage(page + 1)}
          />
        )}
      </li>
    </ul>
  )
}

const NumberItem = ({
  item,
  current,
  onClick,
}: {
  item: number | string
  current: number
  key?: string
  onClick?: VoidFunction
}): JSX.Element => {
  const className =
    item === current ? 'font-bold text-green-spotify px-2' : 'px-2'
  return (
    <li
      className={className}
      key={`catalog-item-${item}`}
      data-testid={`catalog-item-${item}`}
      onClick={onClick}
    >
      {item}
    </li>
  )
}
