import { RightOutlined } from '@ant-design/icons';

export function ArrowRight(props: any) {
  const { onClick } = props;
  return (
    <div
      className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/70 rounded-full cursor-pointer hover:bg-white transition`}
      onClick={onClick}
    >
      <RightOutlined style={{ fontSize: 16 }} />
    </div>
  );
}