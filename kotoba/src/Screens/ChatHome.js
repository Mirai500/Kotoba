import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import { Button, Divider, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router";

import { db, auth } from "../Firebase";
import {
	addDoc,
	collection,
	onSnapshot,
	orderBy,
	query,
} from "firebase/firestore";

function UsersComponent(props) {
	const handleToggle = (username, userId) => {
		props.setReceiverData({
			username: username,
			userId: userId,
		});

		props.navigate(`/chat-home/${userId}`);
	};

	return (
		<List
			dense
			sx={{
				width: "100%", maxWidth: 360,
				bgcolor: "background.paper"
			}}
		>
			{props.users?.map((value, index) => {
				const labelId = `checkbox-list-secondary-label-${value}`;

				if (props.currentUserId !== value.userId)
					return (
						<ListItem key={value.userId} disablePadding>
							<ListItemButton
								onClick={() => {
									handleToggle(value.username, value.userId);
								}}
							>
								<ListItemAvatar>
									<Avatar
										alt={`${value.username}`}
										src={`${value.username}.jpg`}
									/>
								</ListItemAvatar>
								<ListItemText id={labelId}
									primary={`${value.username}`} />
							</ListItemButton>
						</ListItem>
					);
			})}
		</List>
	);
}

export default function Home() {
	const [users, setUsers] = useState([]);

	const [receiverData, setReceiverData] = useState(null);
	const [chatMessage, setChatMessage] = useState("");

	const [allMessages, setAllMessages] = useState([]);

	const user = auth.currentUser;

	const navigate = useNavigate();

	useEffect(() => {
		const unsub = onSnapshot(collection(db, "users"), (snapshot) => {
			setUsers(snapshot.docs.map((doc) => doc.data()));
		});
		return unsub;
	}, []);

	useEffect(() => {
		if (receiverData) {
			const unsub = onSnapshot(
				query(
					collection(
						db,
						"users",
						user?.uid,
						"chatUsers",
						receiverData?.userId,
						"messages"
					),
					orderBy("timestamp")
				),
				(snapshot) => {
					setAllMessages(
						snapshot.docs.map((doc) => ({
							id: doc.id,
							messages: doc.data(),
						}))
					);
				}
			);
			return unsub;
		}
	}, [receiverData?.userId]);