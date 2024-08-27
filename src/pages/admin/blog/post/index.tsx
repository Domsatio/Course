import React, { useState, useEffect } from "react";
import TableData from "@/components/TableData";
import { DATA_POSTS } from "@/helpers/dummyData";
import { PostProps, CategoryProps, InputListProps } from "@/helpers/typeProps";
import { PencilIcon } from "@heroicons/react/24/solid";
import {
  Typography,
  Chip,
  Avatar,
  IconButton,
  Tooltip,
  rating,
} from "@material-tailwind/react";
import * as Yup from "yup";
const TABLE_HEAD = ["Title", "Body", "Category", ""];

export default function index() {
  const [data, setData] = useState([]);
  return (
    <TableData
      title="Posts"
      description="List of posts"
      tableHeader={TABLE_HEAD}
      dummyData={DATA_POSTS}
      urlData="https://dummyjson.com/posts"
      onSuccess={(data) => setData(data)}
      filter={dummyInputList}
    >
      {/* {children} */}
      {data?.map((post: PostProps, index: number) => {
        const isLast = index === data.length - 1;
        const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
        return (
          <tr key={post.id}>
            <td className={classes}>
              <div className="flex items-center gap-3">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-bold"
                >
                  {post.title}
                </Typography>
              </div>
            </td>
            <td className={classes}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
              >
                {post.body}
              </Typography>
            </td>
            <td className={classes}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
              >
                <div className="flex gap-2">
                  {post.categories?.map(
                    (category: CategoryProps, index: number) => (
                      <Chip
                        key={index}
                        value={category.name}
                        className="min-w-min"
                      />
                    )
                  )}
                </div>
              </Typography>
            </td>
          </tr>
        );
      })}
    </TableData>
  );
}

// Define the dummy data for the InputListProps interface
const dummyInputList: InputListProps[] = [
  {
    className: 'input-text',
    name: 'username',
    label: 'Username',
    type: 'input',
    hide: false,
    removeOnSubmit: false,
    disabled: false,
    lockData: false,
    validator: Yup.string(),// Simple validator example
    value: '',
  },
  {
    className: 'input-select',
    name: 'userRole',
    label: 'User Role',
    type: 'select',
    hide: false,
    removeOnSubmit: true,
    disabled: false,
    lockData: false,
    validator: Yup.string(),// Simple validator example
    value: '',
    listData: [
      { title: 'Admin', value: 'admin' },
      { title: 'Editor', value: 'editor' },
      { title: 'Viewer', value: 'viewer' },
    ],
  },
  // {
  //   className: 'input-multicheckbox',
  //   name: 'preferences',
  //   label: 'Preferences',
  //   type: 'multicheckbox',
  //   hide: false,
  //   removeOnSubmit: false,
  //   disabled: false,
  //   lockData: false,
  //   validator: Yup.array().required('preferences harus diisi'),// Simple validator example
  //   value: [],
  //   listData: [
  //     { title: 'Email Notifications', value: 'email_notifications' },
  //     { title: 'SMS Alerts', value: 'sms_alerts' },
  //     { title: 'Push Notifications', value: 'push_notifications' },
  //   ],
  // },
];
