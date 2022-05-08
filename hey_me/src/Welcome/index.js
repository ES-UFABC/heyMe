import React, { useState, useEffect } from "react";
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './welcome.css';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import ShareIcon from '@mui/icons-material/Share';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import MoreVertIcon from '@mui/icons-material/MoreVert';

var table_data = [];

function RenderTable () {
	// console.log("render table", table_data);
	return <> {
		table_data.map(
			(item)=>{
				return(
					<tr key={item['id']}>
						<td>{item['name']}</td>
						<td>{item['email']}</td>
						<td><i className="fa-solid fa-comment-dots fa-1.5x" style={{color:"rgb(220, 206, 206)"}}></i></td>
					</tr>
				)
			}
		)
	}
	</>
}

function Welcome() {
	var validate = 2;
	const navigate = useNavigate();
	var isTherapist = localStorage.getItem('isTherapist');

	const callNavigate = useEffect(() => {
		if (validate == 0) {
			navigate('/login');
		}
	}, []);

	const callList = useEffect(() => {
	if (terapistload == 2) {
		if (isTherapist == '1') {
			let res = {};
			let config = {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`,
						"Origin": localStorage.getItem('api-origin')
				}
			};

			axios.get(`${localStorage.getItem("api-endpoint")}/patients`, config)
						.then(function(response) {
							res = response.data;
							console.log(res['success']);
							if (res['success'] == true) {
								console.log('patients = ', res['patients']);
								table_data = res['patients'];
								isTherapist = 1;
								setTerapistload(1);
							}
				//Perform action based on response
					})
					.catch(function(error){
						console.log(error);
				//Perform action based on error
					});
		}
		else if (isTherapist == '0') {
			setTerapistload(0);
		}
	}
	}, []);
	
	  if (!localStorage.getItem('token')) {
		validate = 0;
		console.log('validate', validate, 'token = ', localStorage.getItem('token'));
	  }

	const [terapistload, setTerapistload] = useState(2);

		return (validate) ? (
			<div>
				<div className="welcome">
					<Header />
					<h1>Bem-Vindo ao heyMe!</h1>
					{callList}
				</div>
				<br></br>
					{terapistload == 1 &&
					<div className="tbl-all">
						<div className="tbl-header">
							<table cellPadding="0" cellSpacing="0" border="0">
								<thead>
									<tr>
										<th>
											Pacientes
										</th>
										<th>
											Email
										</th>
										<th>
											Chat
										</th>
									</tr>
								</thead>
							</table>
						</div>
  						<div className="tbl-content">
							<table cellPadding="0" cellSpacing="0" border="0">
								<tbody>
								{/* <tr>
										<td>
											Pacientes
										</td>
										<td>
											Email
										</td>
										<td>
											Chat
										</td>
									</tr> */}
									<RenderTable/>
								</tbody>
							</table>
						</div>
					</div>				
					}
					{terapistload == 0 &&
					<table>
						<tbody>
							<tr>
								<td>
									<Card sx={{ maxWidth: 345 }}>
											<CardHeader
											avatar={
												<Avatar sx={{ bgcolor: red[500] }} aria-label="diario">
												D
												</Avatar>
											}
											action={
												<IconButton aria-label="settings">
												{/* <MoreVertIcon /> */}
												</IconButton>
											}
											title="Diário"
											//   subheader="September 14, 2016"
											/>
											<CardMedia
											component="img"
											height="194"
											image={require("../assets/diary-512.webp")}
											alt="Diario"
											/>
											<CardContent>
											<Typography variant="body2" color="text.secondary">
												Essa funcionalidade permite ao usuário escrever como foi o seu dia ou qualquer outro dia. Literalmente um diário virtual.
											</Typography>
											</CardContent>
											<CardActions disableSpacing>
											</CardActions>
										</Card>
									</td>
									<td>
										<Card sx={{ maxWidth: 345 }}>
											<CardHeader
											avatar={
												<Avatar sx={{ bgcolor: red[500] }} aria-label="chatbot">
												C
												</Avatar>
											}
											action={
												<IconButton aria-label="settings">
												{/* <MoreVertIcon /> */}
												</IconButton>
											}
											title="Charles"
											//   subheader="September 14, 2016"
											/>
											<CardMedia
											component="img"
											height="194"
											image={require("../assets/charles.png")}
											alt="Charles"
											/>
											<CardContent>
											<Typography variant="body2" color="text.secondary">
												Essa funcionalidade permite ao usuário conversar com nosso Chatbot para ter um atendimento psicológico primário de maneira virtual e sem custos.
											</Typography>
											</CardContent>
											<CardActions disableSpacing>
											</CardActions>
										</Card>
									</td>
								  <td>
									<Card sx={{ maxWidth: 345 }}>
										<CardHeader
										avatar={
											<Avatar sx={{ bgcolor: red[500] }} aria-label="psicologo">
											P
											</Avatar>
										}
										action={
											<IconButton aria-label="settings">
											{/* <MoreVertIcon /> */}
											</IconButton>
										}
										title="Chat com psicologo"
										//   subheader="September 14, 2016"
										/>
										<CardMedia
										component="img"
										height="194"
										image={require("../assets/psicologo.png")}
										alt="Psicologo"
										/>
										<CardContent>
										<Typography variant="body2" color="text.secondary">
											Essa funcionalidade permite ao usuário conversar o psicológo/paciente sem precisar sair da ferramenta.
										</Typography>
										</CardContent>
										<CardActions disableSpacing>
										</CardActions>
									</Card>
				  				</td>
							</tr>
						</tbody>
					</table>
					}
			</div>
		) : (
			<div>
				{callNavigate}
			</div>
		);
}

export default Welcome;