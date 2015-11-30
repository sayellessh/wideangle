/* doctor360_g.Tables[0] = Customer Details
doctor360_g.Tables[1] = Campaign List
doctor360_g.Tables[2] = Last 3 visit
doctor360_g.Tables[3] = samples given
doctor360_g.Tables[4] = Non samples given
doctor360_g.Tables[5] = Chemist Details
doctor360_g.Tables[6] = RCPA Details
doctor360_g.Tables[7] = Products Mapped
doctor360_g.Tables[8] = Doctor Remarks*/
var popup = {
    el: $('#popup_more_wrapper'),
    show: function(content, onCreate){
        popup.createPopup(content, onCreate);
    },
    hide: function(){
        $('#popup_more_wrapper').hide(300, function(){
        $('#popup_more_wrapper').remove();
    });
    },
    createPopup: function(content, onCreate) {
        popup.hide();
        var html = '<div id="popup_more_wrapper"><div class="popup_more" id="popup_more"><div class="popup-content">';
        html += content;
        html += '</div><div class="close_btn">X</div></div></div>';
        html = $(html);
        $('.ui-page').append(html);

        if(onCreate) onCreate();
        $('#popup_more_wrapper').bind('click', function(evt){
            if($(evt.target).attr('id') == 'popup_more_wrapper')
            $(this).remove();
        });
        $('.close_btn').bind('click', function(){
            $('#popup_more_wrapper').remove();
        });
        popup.setPosition();
    },
    setPosition: function(){
        var cHgt = $('.popup_more').height(), wHgt = $(window).height();
        var top = (wHgt - cHgt)/2;
        if(cHgt > 420) $('.popup-content').css('height', '436px');
        $('.popup_more').css('top', top + 'px');
    }
};
function fnBuildDoctorDetails() {
    var grid = '';
    grid += '<div id="doctor360Table" style="padding: 20px;">';
    //grid += '<a href="#popupDoctor" data-rel="back" data-role="button" data-theme="a" data-icon="delete" data-iconpos="notext" class="ui-btn-right">Close</a>';
    grid += '<div id="doctorHeader">';
    grid += '<h3>Doctor Details</h3>';
    grid += '</div>';
    
    grid += '<div id="divdoctorDetails"></div>';
    
    grid += '<div id="campaignHeader">';
    grid += '<h3>Campaign Details:</h3>';
    grid += '</div>';
    
    grid += '<div id="divcampaign_list"></div>';
    
    grid += '<div id="visitHeader">';
    grid += '<h4>Last 3 Visits</h4>';
    grid += '</div>';
    
    grid += '<div id="divlast3visit"></div>';
    
    grid += '<div id="productHeader">';
    grid += '<h4>Product Mapping Details</h4>';
    grid += '</div>';
    
    grid += '<div id="divproduct_details"></div>';
    
    grid += '<div id="sampleHeader">';
    grid += '<h4>Product and Sample Details:</h4>';
    grid += '</div>';
    
    grid += '<div id="divnonsample_details"></div>';
    
    grid += '<div id="chemistHeader">';
    grid += '<h4>Chemist Visited:</h4>';
    grid += '</div>';
    
    grid += '<div id="divchemist_details"></div>';
    
    grid += '<div id="rcpaHeader">';
    grid += '<h4>RCPA</h4>';
    grid += '</div>';
    
    grid += '<div id="divrcpa"></div>';
    
    grid += '<div id="mappedHeader">';
    grid += '<h4>Product Mapping Details:</h4>';
    grid += '</div>';
    
    grid += '<div id="divmapped_details"></div>';
    
    grid += '<div id="remarkHeader">';
    grid += '<h4>Remarks:</h4>';
    grid += '</div>';
    
    grid += '<div id="divremarks_details"></div>';
    grid += '</div>';
    popup.show(grid, function(){
        // TO DO
       fnBuildDoctorDetails1();
       fnBuildCampaignList();
       fnBuildLast3Visit();
       fnBuildSampleDetails();
       fnBuildNonSampleDetails();
       fnBuildChemistDetails();
       fnBuildRCPADetails();
       fnBuildProductMappingDetails();
       fnBuildDoctorRemarks();
       $('#popup_more').height(400);
       var isc = new iScroll('popup_more');
    });
    
}

function fnBuildDoctorDetails1() {
    var doctorName = doctor360_g.Tables[0].Rows[0].Customer_Name;
    var doc_category = doctor360_g.Tables[0].Rows[0].Category_Name;
    var doc_speciality = doctor360_g.Tables[0].Rows[0].Speciality_Name;
    var doc_dob = doctor360_g.Tables[0].Rows[0].DOB;
    var mdlNo = 0;
    if (doctor360_g.Tables[0].Rows[0].MDL_Number != "") {
        if (doctor360_g.Tables[0].Rows[0].MDL_Number.match(/^\d+$/)) {
            mdlNo = parseInt(doctor360_g.Tables[0].Rows[0].MDL_Number);
        }
        else {
            mdlNo = doctor360_g.Tables[0].Rows[0].MDL_Number;
        }
    }

    var htmlString = "<span>" + doctorName + "</span> <span style='color:#333'> | <span> <span>" + mdlNo + "</span><span style='color:#333'> | <span><span style='color:#333'><span> <span>" + doc_speciality + "</span> <span style='color:#333'> | <span> <span>DOB : " + doc_dob + "</span>";
    $("#divdoctorDetails").html(htmlString);
}

// Campaign List
function fnBuildCampaignList() {

    var html = '';//$("#divcampaign_list").html();
    if (doctor360_g.Tables[1].Rows.length > 0) {
        var length = doctor360_g.Tables[1].Rows.length;
        var htmlString = "";
        for (var i = 0; i < length; i++) {
            var campaignName = doctor360_g.Tables[1].Rows[i].Campaign_Name;
            htmlString += "<span class='campaignName'>" + campaignName + "</span>";
        }

        $("#divcampaign_list").html(html + htmlString);
    }
    else {
        $("#divcampaign_list").html(html + "No campaigns mapped for this doctor.");
    }
}

// Last 3 Visit Dates
function fnBuildLast3Visit() {
    var html = '';// $("#divlast3visit").html();
    if (doctor360_g.Tables[2].Rows.length > 0) {
        var length = doctor360_g.Tables[2].Rows.length;
        var htmlString = "";
        for (var i = 0; i < length; i++) {
        	var dcrDate = doctor360_g.Tables[2].Rows[i].DCR_Actual_Date;
            if(dcrDate != null)
            	htmlString += "<span class='dcrdate'>" + dcrDate.split('/')[1] + "/" + dcrDate.split('/')[0] + "/" + dcrDate.split('/')[2] + "</span>,";
        }
        if(htmlString != null && htmlString != '')
        	$("#divlast3visit").html(html + htmlString);
        else
        	$("#divlast3visit").html(html + "<span>No last visit details found.</span>");
    }
    else {
        $("#divlast3visit").html(html + "<span>No last visit details found.</span>");
    }
}

function fnBuildSampleDetails() {
    var html = '';// $("#divproduct_details").html();
    if (doctor360_g.Tables[3].Rows.length > 0) {
        var length = doctor360_g.Tables[3].Rows.length;
        var htmlString = "";
        for (var i = 0; i < length; i++) {
            var sampleName = doctor360_g.Tables[3].Rows[i].Product_Name;
            var qty = doctor360_g.Tables[3].Rows[i].Quantity_Provided;
            var date = doctor360_g.Tables[3].Rows[i].DCR_Date;
            htmlString += "<span>" + (i + 1) + ". </span><span>" + sampleName + "</span><span> - " + qty + " Nos.</span><span> (" + date + ")</span><br />";
        }
        $("#divproduct_details").html(html + htmlString);
    }
    else {
        $("#divproduct_details").html(html + "<span>No SAMPLES given to this doctor.</span>");
    }
}

function fnBuildNonSampleDetails() {
    var html = '';// $("#divnonsample_details").html();
    if (doctor360_g.Tables[4].Rows.length > 0) {
        var length = doctor360_g.Tables[4].Rows.length;
        var htmlString = "";
        for (var i = 0; i < length; i++) {
            var sampleName = doctor360_g.Tables[4].Rows[i].Product_Name;
            var qty = doctor360_g.Tables[4].Rows[i].Quantity_Provided;
            var date = doctor360_g.Tables[4].Rows[i].DCR_Date;
            htmlString += "<span>" + (i + 1) + ". </span><span>" + sampleName + "</span><span> - " + qty + " Nos.</span><span> (" + date + ")</span><br />";
        }
        $("#divnonsample_details").html(html + htmlString);
    }
    else {
        $("#divnonsample_details").html(html + "<span>No Non-SAMPLES given to this doctor.</span>");
    }
}

function fnBuildChemistDetails() {
    var html = '';// $("#divchemist_details").html();
    if (doctor360_g.Tables[5].Rows.length > 0) {
        var length = doctor360_g.Tables[5].Rows.length;
        var htmlString = "";
        for (var i = 0; i < length; i++) {
            var chemistName = doctor360_g.Tables[5].Rows[i].Chemists_Name;
            var date = doctor360_g.Tables[5].Rows[i].DCR_Date;
            var POB = doctor360_g.Tables[5].Rows[i].PO_Amount;
            htmlString += "<span>" + (i + 1) + ". </span><span>" + chemistName + "</span><span> - (" + date + ")</span><span> POB " + POB + "</span><br />";
        }
        $("#divchemist_details").html(html + htmlString);
    }
    else {
        $("#divchemist_details").html(html + "<span>No chemist visit to this doctor.</span>");
    }
}

function fnBuildRCPADetails() {

    if (doctor360_g.Tables[6].Rows.length > 0) {
        var proArr = new Array();
        var comArr = new Array();
        var rcpaDetails = "";
        var totalProCount = 0;
        var myProdCount = 0;
        for (var c = 0; c < doctor360_g.Tables[6].Rows.length; c++) {
            if ($.inArray(doctor360_g.Tables[6].Rows[c].Product_Name, proArr) == -1) {
                proArr.push(doctor360_g.Tables[6].Rows[c].Product_Name);
            }
            if ($.inArray(doctor360_g.Tables[6].Rows[c].Competitor_Product_Name, comArr) == -1) {
                comArr.push(doctor360_g.Tables[6].Rows[c].Competitor_Product_Name);
            }
        }
        var rcpaContent = "";
        rcpaContent += "<table>";
        rcpaContent += "<tr>";
        rcpaContent += "<td class='tdrcpa'>Product</td>";
        rcpaContent += "<td class='tdrcpa'>My Prescription</td>";
        for (var a = 0; a < comArr.length; a++) {
            if (comArr[0] != null) {
                rcpaContent += "<td class='tdrcpa'>" + comArr[a].toString() + "</td>";
            }
        }
        rcpaContent += "</tr>";

        for (var b = 0; b < proArr.length; b++) {
            totalProCount = 0;
            myProdCount = 0;
            rcpaContent += "<tr>";
            rcpaContent += "<td class='tdrcpa'>" + proArr[b].toString() + "</td>";

            //MyPrescription bind
            var produt = jsonPathFunction(doctor360_g, "$.Tables[6].Rows[?(@.Product_Name=='" + proArr[b].toString() + "')]");
            if (produt != false && produt != undefined) {
                if (produt[0].MyQty != "") {
                    rcpaContent += "<td class='tdrcpa'>" + produt[0].MyQty + "</td>";
                    totalProCount += parseInt(produt[0].MyQty);
                    myProdCount = parseInt(produt[0].MyQty);
                }
                else {
                    rcpaContent += "<td class='tdrcpa'>0</td>";
                }
            }
            else {
                rcpaContent += "<td class='tdrcpa'>0</td>";
            }
            //competetior product qty bind
            for (var d = 0; d < comArr.length; d++) {
                if (comArr[0] != null) {
                    var comProdut = jsonPathFunction(doctor360_g, "$.Tables[6].Rows[?(@.Product_Name=='" + proArr[b].toString() + "' & @.Competitor_Product_Name=='" + comArr[d].toString() + "')]");
                    if (comProdut != false && comProdut != undefined) {
                        if (comProdut[0].Comp_Qty != null) {
                            rcpaContent += "<td class='tdrcpa'>" + comProdut[0].Comp_Qty + "</td>";
                            totalProCount += parseInt(comProdut[0].Comp_Qty);
                        }
                        else {
                            rcpaContent += "<td class='tdrcpa'>0</td>";
                        }
                    }
                    else {
                        rcpaContent += "<td class='tdrcpa'>0</td>";
                    }
                }
            }

            rcpaContent += "</tr>";
            rcpaDetails += proArr[b].toString() + " = " + "<span class='spntotPres'> Total Prescription " + totalProCount + " ,</span><span class='spnYield'>My Yield/Prescription " + myProdCount + "</span><br />";
        }
        rcpaContent += "</table>";

        $("#divrcpa").html(rcpaContent + "<br />" + rcpaDetails);
    }
    else {
        $("#divrcpa").html("<span>No RCPA details found.</span>");
    }
}

function fnBuildProductMappingDetails() {
    var html = '';// $("#divmapped_details").html();
    if (doctor360_g.Tables[7].Rows.length > 0) {
        var length = doctor360_g.Tables[7].Rows.length;
        var htmlString = "";
        for (var i = 0; i < length; i++) {
            var productName = doctor360_g.Tables[7].Rows[i].Product_Name;
            var yield = doctor360_g.Tables[7].Rows[i].Support_Quantity;
            var potentail = doctor360_g.Tables[7].Rows[i].Potential_Quantity;
            var date = doctor360_g.Tables[7].Rows[i].Date;

            htmlString += "<span>" + (i + 1) + ". </span><span>" + productName + "</span><span> -Yield : " + yield + ',Potentail :' + potentail + "</span> <span> - ( " + date + ")</span><br />";
        }
        $("#divmapped_details").html(html + htmlString);
    }
    else {
        $("#divmapped_details").html(html + "<span>No Products mapped to this Doctor, on this date.</span>");
    }
}

function fnBuildDoctorRemarks() {
    var html = '';// $("#divremarks_details").html();
    if (doctor360_g.Tables[8].Rows.length > 0) {
        var length = doctor360_g.Tables[8].Rows.length;
        var htmlString = "";       
        for (var i = 0; i < length; i++) {
            var date = doctor360_g.Tables[8].Rows[i].Date;
            var remarks = doctor360_g.Tables[8].Rows[i].Remarks_By_User;
            if ((remarks == "" || remarks == null)) {
                remarks = "No remarks";
            }
            htmlString += "<span>" + (i + 1) + ". </span><span>" + remarks + "</span><span> - ( " + date + ")</span><br />";
        }
        $("#divremarks_details").html(html + htmlString);
    }

    else {
        $("#divremarks_details").html(html + "<span>No remarks.</span>");
    }
}

function jsonPathFunction(obj, expr, arg) {
	   var P = {
	      resultType: arg && arg.resultType || "VALUE",
	      result: [],
	      normalize: function(expr) {
	         var subx = [];
	         return expr.replace(/[\['](\??\(.*?\))[\]']/g, function($0,$1){return "[#"+(subx.push($1)-1)+"]";})
	                    .replace(/'?\.'?|\['?/g, ";")
	                    .replace(/;;;|;;/g, ";..;")
	                    .replace(/;$|'?\]|'$/g, "")
	                    .replace(/#([0-9]+)/g, function($0,$1){return subx[$1];});
	      },
	      asPath: function(path) {
	         var x = path.split(";"), p = "$";
	         for (var i=1,n=x.length; i<n; i++)
	            p += /^[0-9*]+$/.test(x[i]) ? ("["+x[i]+"]") : ("['"+x[i]+"']");
	         return p;
	      },
	      store: function(p, v) {
	         if (p) P.result[P.result.length] = P.resultType == "PATH" ? P.asPath(p) : v;
	         return !!p;
	      },
	      trace: function(expr, val, path) {
	         if (expr !== "") {
	            var x = expr.split(";"), loc = x.shift();
	            x = x.join(";");
	            if (val && val.hasOwnProperty(loc))
	               P.trace(x, val[loc], path + ";" + loc);
	            else if (loc === "*")
	               P.walk(loc, x, val, path, function(m,l,x,v,p) { P.trace(m+";"+x,v,p); });
	            else if (loc === "..") {
	               P.trace(x, val, path);
	               P.walk(loc, x, val, path, function(m,l,x,v,p) { typeof v[m] === "object" && P.trace("..;"+x,v[m],p+";"+m); });
	            }
	            else if (/^\(.*?\)$/.test(loc)) // [(expr)]
	               P.trace(P.eval(loc, val, path.substr(path.lastIndexOf(";")+1))+";"+x, val, path);
	            else if (/^\?\(.*?\)$/.test(loc)) // [?(expr)]
	               P.walk(loc, x, val, path, function(m,l,x,v,p) { if (P.eval(l.replace(/^\?\((.*?)\)$/,"$1"),v[m],m)) P.trace(m+";"+x,v,p); });
	            else if (/^(-?[0-9]*):(-?[0-9]*):?([0-9]*)$/.test(loc)) // [start:end:step]  phyton slice syntax
	               P.slice(loc, x, val, path);
	            else if (/,/.test(loc)) { // [name1,name2,...]
	               for (var s=loc.split(/'?,'?/),i=0,n=s.length; i<n; i++)
	                  P.trace(s[i]+";"+x, val, path);
	            }
	         }
	         else
	            P.store(path, val);
	      },
	      walk: function(loc, expr, val, path, f) {
	         if (val instanceof Array) {
	            for (var i=0,n=val.length; i<n; i++)
	               if (i in val)
	                  f(i,loc,expr,val,path);
	         }
	         else if (typeof val === "object") {
	            for (var m in val)
	               if (val.hasOwnProperty(m))
	                  f(m,loc,expr,val,path);
	         }
	      },
	      slice: function(loc, expr, val, path) {
	         if (val instanceof Array) {
	            var len=val.length, start=0, end=len, step=1;
	            loc.replace(/^(-?[0-9]*):(-?[0-9]*):?(-?[0-9]*)$/g, function($0,$1,$2,$3){start=parseInt($1||start);end=parseInt($2||end);step=parseInt($3||step);});
	            start = (start < 0) ? Math.max(0,start+len) : Math.min(len,start);
	            end   = (end < 0)   ? Math.max(0,end+len)   : Math.min(len,end);
	            for (var i=start; i<end; i+=step)
	               P.trace(i+";"+expr, val, path);
	         }
	      },
	      eval: function(x, _v, _vname) {
	         try { return $ && _v && eval(x.replace(/@/g, "_v")); }
	         catch(e) { throw new SyntaxError("jsonPath: " + e.message + ": " + x.replace(/@/g, "_v").replace(/\^/g, "_a")); }
	      }
	   };

	   var $ = obj;
	   if (expr && obj && (P.resultType == "VALUE" || P.resultType == "PATH")) {
	      P.trace(P.normalize(expr).replace(/^\$;/,""), obj, "$");
	      return P.result.length ? P.result : false;
	   }
	}