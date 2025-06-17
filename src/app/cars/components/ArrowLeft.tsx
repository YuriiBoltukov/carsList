import { LeftOutlined } from '@ant-design/icons';

interface Props {
  onClick?: () => void;
}

export function ArrowLeft(props: Props) {
  const { onClick } = props;
  return (
    <div
      className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/70 rounded-full cursor-pointer hover:bg-white transition`}
      onClick={onClick}
    >
      <LeftOutlined style={{ fontSize: 16 }} />
    </div>
  );
}