
function GetData(class_container,url){
	$.get(url, function(data) {
        var content = data;

        for(var i = 0; i < content.length; i++){
            if(class_container == 'product'){
                total_product_list += 1
                $("."+class_container).append(`
	        		<option value="${content[i]['pk']}">${content[i]['name']} - ${content[i]['code']}</option>
	        	`)
            }
            else{
                $("."+class_container).append(`
	        		<option value="${content[i]['pk']}">${content[i]['name']}</option>
	        	`)
            }
        }
    })
}

function DiscountStock(code,quanty,type_sell){
	$.ajax({
		url:"{% url 'DiscountStock' %}",
		data:{'code':code,'quanty':quanty,'type_sell':type_sell},
		success:function(data){
			for(var i = 0; i < product_table.length; i++){
				if(product_table[i]['code'] == code){
					if(type_sell == "Completo"){
						product_table[i]['quanty'] = parseInt(product_table[i]['quanty']) - quanty
					}
					else if(type_sell == "Metros"){
						product_table[i]['metro'] = parseInt(product_table[i]['metro']) - quanty
					}
					else if(type_sell == "Unidad"){
						product_table[i]['und'] = parseInt(product_table[i]['und']) - quanty
					}
				}
			}
		}
	})
}

function IncrementStock(code,quanty,type_sell){
	$.ajax({
		url:"{% url 'IncrementStock' %}",
		data:{'code':code,'quanty':quanty,'type_sell':type_sell},
		success:function(data){
			for(var i = 0; i < product_table.length; i++){
				if(product_table[i]['code'] == code){
					if(type_sell == "Completo"){
						product_table[i]['quanty'] = parseInt(product_table[i]['quanty']) + quanty
					}
					else if(type_sell == "Metros"){
						product_table[i]['metro'] = parseInt(product_table[i]['metro']) + quanty
					}
					else if(type_sell == "Unidad"){
						product_table[i]['und'] = parseInt(product_table[i]['und']) + quanty
					}
				}
			}
		}
	})
}



$(document).ready(function(){

	GetData("list_client","http://localhost:8000/static/clients.json")
	GetData("product","http://localhost:8000/static/inventory.json")

	$(".list_client").change(function(){
		$.ajax({
			url:"{% url 'GET_CLIENT' %}",
			data:{'pk':$(".list_client").val()},
			success:function(data) {
				obj = JSON.parse(data)
				$(".address_client").val(obj['address'])
				$(".phone_client").val(obj['phone'])
				$(".type_client").val(obj['type'])
			}
		})
	})

	$(".payment_form").change(function(){
		$.ajax({
			url:"{% url 'Set_Payment_Form' %}",
			data:{'pk':$(".payment_form").val()},
			success:function(data) {
				value_payment_form = parseInt($(".payment_form").val())
				if(value_payment_form == 2){
					$(".date_expired").prop('hidden', false);
				}
				else{
					$(".date_expired").prop('hidden', true);
				}
			}
		})
	})

	$(".btn_fecha_vence").click(function(){
		fecha_vence = $("#fecha_vence").val()
		console.log(fecha_vence)
		$.ajax({
			url:"{% url 'Date_Expired' %}",
			data:{'date_expired':fecha_vence}
		})
	})


	function ClearField(){
		$(".quanty").val('')
		$(".product").val('')
		$(".discount").val('')
		// $(".price").val('')
		$(".name_product").val('')
		$(".product").focus()
		$(".discount").prop('disabled', true);
		// $(".quanty").prop('disabled', true);
	}

	name_product = null;
	name_type_sell = "Completo"

	$(".type_sell").change(function(){
	    let price;
	    type_sell = $(".type_sell").val()
	    name = "";
	    console.log(product)
	    if(type_sell == 1){
			price = product['price_1']
			name_product = $(".name_product").val();
			$(".stock").val(product['quanty'])
		}
		else if(type_sell == 2){
			price = product['price_2']
			$(".stock").val(product['metro'])
		}
		else if(type_sell == 3){
			price = product['price_3']
			$(".stock").val(product['und'])
		}
		$.ajax({
			url:'{% url "Type_Sell" %}',
			data:{'type_sell':type_sell},
			success:function(data){
				console.log(data)
				if(data == 1){
					name_type_sell = "Completo"
				}
				else if(data == 2){
					name_type_sell = 'Metros'
				}
				else if(data == 3){
					name_type_sell = 'Unidad'
				}
			}
		})
		$(".price").val(price)

	})

	function GetPrice(type_client){
		let price;
		if(type_client == 1){
			price = product['price_1']
		}
		else if(type_client == 2){
			price = product['price_2']
		}
		else if(type_client == 3){
			price = product['price_3']
		}
		else if(type_client == 4){
			price = product['price_4']
		}
		else if(type_client == 5){
			price = product['price_5']
		}
		return price
	}

	function SearchProductInTable(){
		exist = false
		var filas = $(".father").find("tr");
        var resultado = "";
        for(i=0; i<filas.length; i++){
            var celdas = $(filas[i]).find("td");
            value = $(celdas[10]).text().trim()
            if(value === "Completo")
            {
            	value = 1
            }
            else if(value === "Metros")
            {
            	value = 2
            }
            else if(value === "Unidad")
            {
            	value = 3
            }
            code_table_ID = parseInt($(celdas[0]).text().trim())
            ID_code = parseInt(product['ID'])
            console.log(code_table_ID+' '+ID_code)
            if( code_table_ID === ID_code && parseInt($(".type_sell").val()) === value ){
            	console.log(value+' value')
            	exist = true
            	quanty_table = parseFloat($(celdas[3]).text()) + parseFloat($(".quanty").val())
            	$(".quanty"+ID_code).text(quanty_table)
            	price_table = parseFloat($(celdas[3]).text())
            	subtotal_row_table = quanty_table * price
            	$(celdas[9]).text(subtotal_row_table)
            }
        }
        console.log("Existo "+exist)
        return exist
	}

	function ProductExist(){
		var filas = $(".father").find("tr");
        var resultado = "";
        for(i=0; i<filas.length; i++){
            var celdas = $(filas[i]).find("td");
            if($(celdas[0]).text() === product['ID']){
            	quanty = parseInt($("#quanty").val()) + parseInt($(celdas[2]).text())
            	if(quanty == 0){
            		$(filas[i]).remove();
            		ClearField()
            	}
            	else{
                	$(celdas[2]).text(quanty)
                	tax_val = ( price - (price / (1 + (parseFloat(product['tax']) / 100)))).toFixed(2)
                	tax = quanty * parseFloat(tax_val)
                	$(celdas[5]).text(tax)
                	price_row = parseFloat($(celdas[3]).text())
                	$(celdas[8]).text(price_row * quanty)
                }
            }
        }
        CalculateTotalsInvoice()
	}

	function CalculateTotalsInvoice(){
		var filas = $(".father").find("tr");
        var resultado = "";
        let subtotal_row_table_invoice = 0
		let tax_row_table_invoice = 0
        for(i=0; i<filas.length; i++){
            var celdas = $(filas[i]).find("td");
        	subtotal_row_table_invoice += parseFloat($(celdas[9]).text())
        	tax_row_table_invoice += parseFloat($(celdas[6]).text())
        }
        $("#Subtotal_Invoice").text(subtotal_row_table_invoice.toFixed(2))
        $("#Totals_Invoice").text((subtotal_row_table_invoice + tax_row_table_invoice).toFixed(2))
        $("#Tax_Invoice").text(tax_row_table_invoice.toFixed(2))

	}

	$(".product").change(function(){
		$.ajax({
			url:"{% url 'GET_PRODUCT' %}",
			data:{'value':$('.product').val()},
			success:function(data){
				obj = JSON.parse(data)
				if(Object.keys(obj).length !== 0){
					product = obj
					product['ID'] = Code
					$(".stock").val(obj['quanty'])
					$(".name_product").val(obj['name'])
					type_client = parseInt($(".type_client").val())
					$(".price").val(GetPrice(type_client))
					$(".quanty").prop('disabled', false);
					$("#quanty").focus()
					product_table.push(product)

				}
				else{
					console.log("No existe el producto")
					$(".Product_DoesNotExist").click()
					$(".product").val('')
					$(".product").focus()
				}
			}
		})
	})

	$(".quanty").keyup(function(e){
		number = $("#quanty").val()
		try {
			var code = (e.keyCode ? e.keyCode : e.which);
			if(code == 68){
				number_result = number.match(regex)[0];
				$("#quanty").val(number_result)
				$(".discount").prop('disabled', false);
				$("#discount").focus()
			}
			else if(code == 13){
				discount = 0
				price = GetPrice(type_client)
				if(price <= 0){
					$("#Add_not_quanty_invoice").click()
				}
				else{
					value_discount = (parseFloat(price) * discount)
					price_total = parseFloat(price) - value_discount
					if(number != "" && parseInt(number) != 0){
						if(SearchProductInTable() === false){
							quanty_stock = parseFloat($(".stock").val())
							set_quanty = parseFloat($(".quanty").val())
							if(set_quanty > quanty_stock){

							}
							else{
								AddToTable()
								$("#quanty").val('')
							}
						}
						else
						{
							ProductExist()
							$("#quanty").val('')
						}
					}
					else{
						$("#Add_not_quanty_invoice").click()
					}
				}
			}
			else if(code == 66){
				ClearField()
			}
			else if(code == 70){
				SaveInvoice()
			}
		}catch(error){
			$("#Add_not_quanty_invoice").click()
			$("#quanty").val('')
		}


	})

	$(".discount").keyup(function(e){
		var code = (e.keyCode ? e.keyCode : e.which);
		if( $(".discount").val() != ''){
			discount = parseFloat($(".discount").val()) / 100
			price = GetPrice(type_client)
			value_discount = (parseFloat(price) * discount)
			price_total = parseFloat(price) - value_discount
			$(".price").val(price_total)
			discount = $(".discount").val()
			if(code == 13){
				if(SearchProductInTable() == false){
					AddToTable()
					$("#quanty").val('')
				}
				else
				{
					ProductExist()
					$("#quanty").val('')
				}
			}
		}
	})


	function AddToTable(){
		number = $("#quanty").val()
		number_result = number.match(regex)[0]
		quanty = parseInt(number_result)
		//GetPrice(type_client)
		type_client = parseInt($(".type_client").val())
		price = parseFloat($(".price").val()).toFixed(2)
		tax_val = ( price - (price / (1 + (parseFloat(product['tax']) / 100)))).toFixed(2)
		price -= tax_val
		subtotal = parseInt($(".price").val()) * quanty
		subtotal = subtotal - tax_val

		name_product = $(".name_product").val();

		$(".father").append(`
			<tr id="${product['code']}">
				<td>
					${Code}
				</td>
				<td>
					${product['code']}
				</td>
				<td>
					${name_product}
				</td>

				<td>
					<button class="plus" style="background-color: #4CAF50; /* Green */border: none;border-radius:2px;color: white;padding: 3px 3px;text-align: center;text-decoration: none;display: inline-block;font-size: 16px;" id="${Code}">+</button>

					<span class="quanty${Code}" style="font-size:15px;padding:5px;">${quanty}</span>

					<button class="less"  style="background-color: #4CAF50; /* Green */border: none;border-radius:2px;color: white;padding: 3px 3px;text-align: center;text-decoration: none;display: inline-block;font-size: 16px;" id="${Code}">-</button>
				</td>
				<td>
					${price}
				</td>
				<td>
					${product['tax']}%
				</td>
				<td>
					${tax_val}
				</td>
				<td>
					${discount}%
				</td>
				<td>
					${value_discount}
				</td>
				<td>
					${subtotal}
				</td>
				<td>
					${name_type_sell}
				</td>
				<td>
					<button class="btn btn-primary delete_product" id="${Code}"><i class="dw dw-delete-3"></button>
				</td>


			</tr>
		`)

		CalculateTotalsInvoice()
		DiscountStock(product['code'],quanty,name_type_sell)
		Code += 1


	}

	$(".send_invoice").click(function(){
		if( $('#father').tableToJSON().length >= 1){
			SaveInvoice()
		}
		else{
			$(".Error_Invoice").click()
		}
	})

	function SaveInvoice(){
		$("#REGISTRAMOSCLIENTE").click()
		var table = $('#father').tableToJSON();
		$.ajax({
			url:"{% url 'Save_Invoice' %}",
			data:JSON.stringify(table),
			success:function(data){
				if(data == 'True'){
					let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=0,height=0,left=-1000,top=-1000`;
					window.open("https://ferremalu.pythonanywhere.com/invoice_pos/Invoice_Print/{{consecutive}}","invoice",params)
					location.reload(true)
				}
				else
				{
					$(".Error_Sold_Out").click()
				}
			}
		})
	}

	$(document).on('click','.less',function(){
		code = this.id
		var filas = $(".father").find("tr");
        var resultado = "";
        for(i=0; i<filas.length; i++){
        	var celdas = $(filas[i]).find("td");

            if(parseInt($(celdas[0]).text()) === parseInt(code)){
            	quanty = parseInt($(celdas[3]).text()) - 1
            	if(quanty == 0){
            		IncrementStock(product_table[i]['code'],1,name_type_sell)
            		$(filas[i]).remove();
            		ClearField()
            	}
            	else{
                	$(".quanty"+code).text(quanty)
                	tax_val = ( price - (price / (1 + (parseFloat(product_table[i]['tax']) / 100)))).toFixed(2)
                	tax = quanty * parseFloat(tax_val)
                	$(celdas[6]).text(tax)
                	price_row = parseFloat($(celdas[4]).text())
                	$(celdas[9]).text(price_row * quanty)
                	IncrementStock(product_table[i]['code'],1,name_type_sell)
                }
                console.log(product_table[i])
            }
        }
        CalculateTotalsInvoice()
	})


	$(document).on('click','.plus',function(){
		code = this.id
		var filas = $(".father").find("tr");
        var resultado = "";
        for(i=0; i<filas.length; i++){
        	console.log(product_table[i])
            var celdas = $(filas[i]).find("td");
            if(parseInt($(celdas[0]).text().trim()) === parseInt(code)){
            	quanty = parseInt($(celdas[3]).text()) + 1
            	if(quanty == 0){
            		$(filas[i]).remove();
            		ClearField()
            	}
            	else{
                	$(".quanty"+code).text(quanty)
                	tax_val = ( price - (price / (1 + (parseFloat(product['tax']) / 100)))).toFixed(2)
                	tax = quanty * parseFloat(tax_val)
                	$(celdas[6]).text(tax)
                	price_row = parseFloat($(celdas[4]).text())
                	$(celdas[9]).text(price_row * quanty)
                	DiscountStock(product['code'],1,name_type_sell)
                }
            }
            else{
            	$("#STOCK_OUT").click()
            }
        }
        CalculateTotalsInvoice()
	})

	$(document).on('click','.delete_product',function(){
		code = this.id
		var filas = $(".father").find("tr");
        var resultado = "";
        for(i=0; i<filas.length; i++){
            var celdas = $(filas[i]).find("td");
            if(parseInt($(celdas[0]).text()) === parseInt(code)  && parseInt($(".stock").val()) > 0 ){
            	IncrementStock(product['code'],parseInt($(celdas[3]).text()),name_type_sell)
            	quanty = 0
            	if(quanty == 0){
            		$(filas[i]).remove();
            		ClearField()
            	}
            	else{
                	// $(celdas[2]).text(quanty)
                	$(".quanty"+code).text(quanty)
                	tax_val = ( price - (price / (1 + (parseFloat(product['tax']) / 100)))).toFixed(2)
                	tax = quanty * parseFloat(tax_val)
                	$(celdas[5]).text(tax)
                	price_row = parseFloat($(celdas[3]).text())
                	$(celdas[8]).text(price_row * quanty)
                }
            }
        }
        CalculateTotalsInvoice()

	})

})








