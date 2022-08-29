import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useUser } from '../context/Context.js'
import PageUserLayout from '../layouts/PageUserLayout'
import { WithAuth } from '../HOCs/WithAuth'
import { userDataUpdate, getFac, getAllBank } from '../firebase/utils'
import Subtitle from '../components/Subtitle'
import BlackFont from '../components/BlackFont'
import Button from '../components/Button'
import style from '../styles/Facultad.module.css'

function Carrera() {
    const router = useRouter()
    const { userDB, uniData, setUniversityData, setUserData, setUserSuccess, setUserBank, bank } = useUser()
    const [career, setCareer] = useState(null)

    function continuar() {
        if (career !== null) {
            const materiasDB = uniData.fac[userDB.facDB].materias
            const obj = materiasDB.reduce(function (target, key, index) {
                target[key] = {
                    config: {
                        time: 15,
                        questions: 10,
                        difficulty: 'aleatorio',
                    },
                    progress: false
                }
                return target;
            }, {})

            userDataUpdate(userDB, {
                subjects: obj
            }, setUserData, setUserSuccess)

            getAllBank(userDB, obj, setUserBank)
 
            router.push('/Home')
        }
    }

    function back() {
        router.back()
    }

    function setCareerData(c) {
        setCareer(c)
    }

    useEffect(() => {
        userDB.university ? getFac(userDB.university, setUniversityData) : ''
    }, [userDB, career, bank]);

    return (
        <PageUserLayout>
            {userDB.facDB && <div className={style.container}>
                <div className={style.userDataContainer}>
                    <img src={`/${userDB.avatar}.png`} className={style.perfil} alt="user photo" />
                    <Subtitle>Elije tu Carrera</Subtitle>
                </div> <br />
                <div className={style.blackCareersContainer}>
                    {uniData && userDB ?
                        <BlackFont>
                            <div className={style.careersContainer}>
                                <ul className={style.list}>
                                    {uniData.fac[userDB.facDB].carreras.map((c, i) => <li className={`${style.li} ${c == career ? style.active : ''}`} key={i} onClick={() => setCareerData(c)}>{c}</li>)}
                                </ul>
                                <div className={style.buttonsContainer}>
                                    <Button style={'buttonSecondary'} click={back}>atras</Button>
                                    <Button style={'buttonPrimary'} click={continuar}>continuar</Button>
                                </div>
                            </div>
                        </BlackFont>
                        : ''}
                </div>
            </div>}
        </PageUserLayout>
    )
}

export default WithAuth(Carrera)

