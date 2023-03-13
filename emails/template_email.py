CLOSE_BOX = """ 
	<html>
		<body style="background-color:#e2e1e0;font-family: Open Sans, sans-serif;font-size:100%;font-weight:400;line-height:1.4;color:#000;">
		  <table style="max-width:670px;margin:50px auto 10px;background-color:#fff;padding:50px;-webkit-border-radius:3px;-moz-border-radius:3px;border-radius:3px;-webkit-box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);-moz-box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24); border-top: solid 10px blue;">
		    <thead>
		    	<tr>
		    		<td colspan="2" style="font-size:19px;padding:0px 15px 10px 25%;">Reporte de cierre de caja</td>
		    	</tr>
		      <tr>
		        <th style="text-align:left;"><img style="max-width: 150px;" src="https://buggy.pythonanywhere.com/static/logos_menu/logo.png" alt="bachana tours"></th>
		        <th style="text-align:right;font-weight:400;">$(date)</th>
		      </tr>
		    </thead>
		    <tbody>
		      <tr>
		        <td style="height:35px;"></td>
		      </tr>
		      <tr>
		        <td colspan="2" style="border: solid 1px #ddd; padding:10px 20px;">
		          <p style="font-size:14px;margin:0 0 6px 0;"><span style="font-weight:bold;display:inline-block;min-width:150px">Estatus</span><b style="color:green;font-weight:normal;margin:0">Éxitoso</b></p>
		          <!-- <p style="font-size:14px;margin:0 0 6px 0;"><span style="font-weight:bold;display:inline-block;min-width:146px">Transaction ID</span> abcd1234567890</p> -->
		          <p style="font-size:14px;margin:0 0 0 0;"><span style="font-weight:bold;display:inline-block;min-width:146px">Efectivo</span> COP. $(efectivo)</p>
		          <p style="font-size:14px;margin:0 0 0 0;"><span style="font-weight:bold;display:inline-block;min-width:146px">Consignación</span> COP. $(transferencia)</p>
		          <p style="font-size:14px;margin:0 0 0 0;"><span style="font-weight:bold;display:inline-block;min-width:146px">Crédito</span> COP. $(credito)</p>
		          <p style="font-size:14px;margin:0 0 0 0;"><span style="font-weight:bold;display:inline-block;min-width:146px">Total</span> COP. $(total)</p>
		        </td>
		      </tr>
		      <tr>
		        <td colspan="2" style="height:35px;font-size:15px;padding:30px 15px 0px 25%;">Datos del empleado</td>
		      </tr>
		      <tr>
		        <td style="width:50%;padding:20px;vertical-align:top">
		          <p style="margin:0 0 10px 0;padding:0;font-size:14px;"><span style="display:block;font-weight:bold;font-size:13px">Nombre</span> $(name)</p>
		          <p style="margin:0 0 10px 0;padding:0;font-size:14px;"><span style="display:block;font-weight:bold;font-size:13px;">Teléfono</span> $(phone)</p>
		        </td>
		        <td style="width:50%;padding:20px;vertical-align:top">
		          <p style="margin:0 0 10px 0;padding:0;font-size:14px;"><span style="display:block;font-weight:bold;font-size:13px;">Email</span> $(email)</p>
		        </td>
		      </tr>
		      <!-- <tr>
		        <td colspan="2" style="font-size:20px;padding:30px 15px 0 15px;">Items</td>
		      </tr>
		      <tr>
		        <td colspan="2" style="padding:15px;">
		          <p style="font-size:14px;margin:0;padding:10px;border:solid 1px #ddd;font-weight:bold;">
		            <span style="display:block;font-size:13px;font-weight:normal;">Homestay with fooding & lodging</span> Rs. 3500 <b style="font-size:12px;font-weight:300;"> /person/day</b>
		          </p>
		          <p style="font-size:14px;margin:0;padding:10px;border:solid 1px #ddd;font-weight:bold;"><span style="display:block;font-size:13px;font-weight:normal;">Pickup & Drop</span> Rs. 2000 <b style="font-size:12px;font-weight:300;"> /person/day</b></p>
		          <p style="font-size:14px;margin:0;padding:10px;border:solid 1px #ddd;font-weight:bold;"><span style="display:block;font-size:13px;font-weight:normal;">Local site seeing with guide</span> Rs. 800 <b style="font-size:12px;font-weight:300;"> /person/day</b></p>
		          <p style="font-size:14px;margin:0;padding:10px;border:solid 1px #ddd;font-weight:bold;"><span style="display:block;font-size:13px;font-weight:normal;">Tea tourism with guide</span> Rs. 500 <b style="font-size:12px;font-weight:300;"> /person/day</b></p>
		          <p style="font-size:14px;margin:0;padding:10px;border:solid 1px #ddd;font-weight:bold;"><span style="display:block;font-size:13px;font-weight:normal;">River side camping with guide</span> Rs. 1500 <b style="font-size:12px;font-weight:300;"> /person/day</b></p>
		          <p style="font-size:14px;margin:0;padding:10px;border:solid 1px #ddd;font-weight:bold;"><span style="display:block;font-size:13px;font-weight:normal;">Trackking and hiking with guide</span> Rs. 1000 <b style="font-size:12px;font-weight:300;"> /person/day</b></p>
		        </td>
		      </tr> -->
		    </tbody>
		    <tfooter>
		    </tfooter>
		  </table>
		</body>
	</html>
"""

ALERT_INVENTORY = """

	

"""











