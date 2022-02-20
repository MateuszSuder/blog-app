import { ObjectId } from 'bson';

export type Posts = {
	_id: ObjectId;
	content: string;
	title: string;
};

export const PostsSchema = {
	name: 'Posts',
	properties: {
		_id: 'objectId',
		content: 'string',
		title: 'string',
	},
	primaryKey: '_id',
};
