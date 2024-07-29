import { h } from 'vue';
import { NAvatar } from 'naive-ui';
import { BasicColumn } from '@/components/Table';
export interface ListData {
  id: string;
  name: string;
  avatar: string;
  address: string;
  beginTime: string;
  endTime: string;
  date: string;
}
export const columns: BasicColumn<ListData>[] = [
  {
    title: 'id',
    key: 'id',
    width: 100,
  },
  {
    title: '名称',
    key: 'name',
    width: 100,
  },
  {
    title: '类型',
    key: 'type',
    width: 100,
  },
  {
    title: '备注',
    key: 'remark',
  },
];
