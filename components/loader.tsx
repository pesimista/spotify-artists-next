import { LoadingOutlined } from '@ant-design/icons'

export default function Loader(): JSX.Element {
  return (
    <div className='w-full h-full flex justify-center p-16'>
      <div>
        <LoadingOutlined
          className='text-5xl text-green-spotify font-bold'
          spin
        />
      </div>
    </div>
  )
}
