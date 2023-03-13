import os, img2pdf
def Generador():
	try:
		imagenes_jpg = [archivo for archivo in os.listdir('./') if archivo.endswith(".jpg")]
		with open("static/documento.pdf", "wb") as documento:
			documento.write(img2pdf.convert(imagenes_jpg))
		for i in imagenes_jpg:
			os.remove(i)
	except Exception as e:
		print(e)
