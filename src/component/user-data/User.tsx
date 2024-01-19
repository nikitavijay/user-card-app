import React, { FormEvent, useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { ISelectOption, setUserData } from '../../app/slice/cardDataslice'
import { RootState } from '../../app/store'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';

import './user.scss';
const User = () => {
    const [open, setOpen] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const dispatch = useDispatch()
    const { cardData } = useSelector((state: RootState) => state.cardData);
    useEffect(() => {
        axios.get('https://reqres.in/api/users').then((res) => {
            dispatch(setUserData(res?.data?.data))
        }).catch((err) => console.log(err))
    }, [])

    const addUser = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries((formData as any).entries());
        const job = formJson.job;
        const name = formJson.name
        axios.post("https://reqres.in/api/users", { name: name, job: job }).then((res) => {
            setOpenSnackbar(true)
            setOpen(false)
        }
        ).catch((err) => console.log(err))
    }
    return (
        <>
            <div className="cardContainer">
                {cardData?.map((user: ISelectOption) => {
                    return <div className="cardBox">
                        <div className="container">
                            <img src={user?.avatar} alt="Avatar" style={{ borderRadius: "50%", marginTop: "20px" }} />
                            <h4><b>{user?.first_name + user?.last_name}</b></h4>
                            <p>Architect & Engineer</p>
                        </div>
                    </div>
                })}
                <div className="cardBox">
                    <div className="addContainer">
                        <div className="plusStyle" onClick={() => { setOpen(true) }}>+</div>
                    </div>
                </div>
            </div>



            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                        addUser(event)
                    },
                }}
            >
                <DialogTitle>Add User</DialogTitle>
                <DialogContent>
                    <TextField
                        required
                        margin="dense"
                        id="name"
                        name="name"
                        label="User Name"
                        type="name"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        required
                        margin="dense"
                        id="job"
                        name="job"
                        label="Job"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit" >Submit</Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                autoHideDuration={6000}
                open={openSnackbar}
                onClose={() => { setOpenSnackbar(false) }}
                message="User created"
            />

        </>
    )
}
export default User