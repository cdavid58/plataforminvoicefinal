from query_invoice import Query_Invoice
from django.shortcuts import render
import json, env, threading, queue, requests, time, logging, os
from query_client import Query_Client
from query_inventory import Query_Inventory

my_queue = queue.Queue()
enviroments = env.ENVIROMENT
def storeInQueue(f):
  def wrapper(*args):
  	global my_queue
  	my_queue.put(f(*args))
  return wrapper

def GetAmount(request):
	url = "http://localhost:9090/close_box/Get_Total_Sell/"
	payload = json.dumps({})
	headers = {
	  'Content-Type': 'application/json'
	}
	response = requests.request("POST", url, headers=headers, data=payload)
	return json.loads(response.text)['totals']

def Index(request):
	query = Query_Invoice()
	if 'work_start' not in request.session:
		request.session['work_start'] = time.time()
	# u = threading.Thread(target=Generated_File,args=(request,), name='Invoice')
	# u.start()
	
	n_elec = len(query.GET_LIST_INVOICE(request,1))
	n_pos = len(query.GET_LIST_INVOICE(request,2))
	n_client = len(Query_Client().GET_LIST_CLIENT(request))

	return render(request,'index.html',{'amount':GetAmount(request),'pos':n_pos,'elec':n_elec,'client':n_client})

@storeInQueue
def Generated_File(request):
	try:
		query = Query_Invoice()
		list_invoice_fe = query.GET_LIST_INVOICE(request,1)
		with open(env.FILE_JSON_INVOICE_FE, 'w') as file:
			json.dump(list_invoice_fe, file, indent=4)

		list_invoice_pos = query.GET_LIST_INVOICE(request,2)
		with open(env.FILE_JSON_INVOICE_POS, 'w') as file:
			json.dump(list_invoice_pos, file, indent=4)

		list_client = Query_Client().GET_LIST_CLIENT(request)
		with open(env.FILE_JSON_CLIENTS, 'w') as file:
			json.dump(list_client, file, indent=4)

		list_inventory = Query_Inventory().GET_LIST_INVENTORY(request)
		with open(env.FILE_JSON_INVENTORY, 'w') as file:
			json.dump(list_inventory, file, indent=4)

		url = env.GET_LIST_EMPLOYEE
		payload = json.dumps({"company": request.session['company_pk']})
		headers = {'Content-Type': 'application/json'}
		response = requests.request("POST", url, headers=headers, data=payload)
		with open(env.LIST_EMPLOYEE,'w') as file:
			json.dump(json.loads(response.text),file,indent=4)
			
		del query
	except Exception as e:
		pass