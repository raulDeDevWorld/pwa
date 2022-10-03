import PageLayout from '../layouts/PageLayout'
import { WithAuth } from '../HOCs/WithAuth'
import Link from 'next/link'
import style from '../styles/About.module.css'

function About() {
    return (
        <PageLayout>     
            <div className={style.container}>
            <img src="logo-hazlo-simple.svg" className={style.logo} alt="logo" />
                <h3 className={style.subtitle}>Acerca de:</h3>
                <p className={style.paragraph}>
                    Swoou Preuniversity es un una plataforma de educación mantenida por Swoou Company, que intenta coadyubar. <br />
                    Deseas saber mas acerca de nuestras <br />
                    <Link href="/Policy">
                        <a className={style.policy}>Politicas de Servicio?</a>
                    </Link><br />
                </p>
            </div>
        </PageLayout>
    )
}

export default WithAuth(About)
