from from_number_to_letters import Thousands_Separator
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from .template_email import *
import smtplib,requests

class Email:
	def Send_Close_Box(self,data):
		remitente = 'notificacionesoftware@gmail.com'
		destinatarios = ["notificacionesoftware@gmail.com"]
		asunto = 'Notificación de cierre de caja'
		html = CLOSE_BOX
		html = html.replace("$(date)",str(data['date_open']))
		html = html.replace("$(efectivo)",str(Thousands_Separator(round(data['efec'],2))))
		html = html.replace("$(transferencia)",str(Thousands_Separator(round(data['trans'],2))))
		html = html.replace("$(credito)",str(Thousands_Separator(round(data['cred'],2))))
		html = html.replace("$(name)",str(data['name']))
		html = html.replace("$(email)",str(data['email']))
		html = html.replace("$(phone)",str(data['phone']))
		html = html.replace("$(total)",str(Thousands_Separator(round(data['close_total_box'],2))))
		mensaje = MIMEMultipart()
		mensaje['From'] = remitente
		mensaje['To'] = ", ".join(destinatarios)
		mensaje['Subject'] = asunto
		mensaje.attach(MIMEText(html,'html'))
		sesion_smtp = smtplib.SMTP('smtp.gmail.com', 587)
		sesion_smtp.starttls()
		texto = mensaje.as_string()
		usuario = "notificacionesoftware@gmail.com"
		clave = "zwtalrafuyidxxms"
		sesion_smtp = smtplib.SMTP('smtp.gmail.com', 587)
		sesion_smtp.starttls()
		texto = mensaje.as_string()
		remitente = usuario
		sesion_smtp.login(usuario,clave)
		sesion_smtp.sendmail(remitente, destinatarios, texto)
		sesion_smtp.quit()
		return "Exito"

	def Alert_Inventory(self,data):
		remitente = 'notificacionesoftware@gmail.com'
		destinatarios = ["notificacionesoftware@gmail.com"]
		asunto = 'Notificación de cierre de caja'
		html = CLOSE_BOX
		html = html.replace("$(date)",str(data['date_open']))
		html = html.replace("$(efectivo)",str(Thousands_Separator(round(data['efec'],2))))
		html = html.replace("$(transferencia)",str(Thousands_Separator(round(data['trans'],2))))
		html = html.replace("$(credito)",str(Thousands_Separator(round(data['cred'],2))))
		html = html.replace("$(name)",str(['hola','chao','chao','chao','chao','chao']))
		html = html.replace("$(email)",str(data['email']))
		html = html.replace("$(phone)",str(data['phone']))
		html = html.replace("$(total)",str(Thousands_Separator(round(data['close_total_box'],2))))
		mensaje = MIMEMultipart()
		mensaje['From'] = remitente
		mensaje['To'] = ", ".join(destinatarios)
		mensaje['Subject'] = asunto
		mensaje.attach(MIMEText(html,'html'))
		sesion_smtp = smtplib.SMTP('smtp.gmail.com', 587)
		sesion_smtp.starttls()
		texto = mensaje.as_string()
		usuario = "notificacionesoftware@gmail.com"
		clave = "zwtalrafuyidxxms"
		sesion_smtp = smtplib.SMTP('smtp.gmail.com', 587)
		sesion_smtp.starttls()
		texto = mensaje.as_string()
		remitente = usuario
		sesion_smtp.login(usuario,clave)
		sesion_smtp.sendmail(remitente, destinatarios, texto)
		sesion_smtp.quit()
		return "Exito"




