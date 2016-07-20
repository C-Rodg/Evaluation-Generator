<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

  <xsl:output method="html" indent="yes" omit-xml-declaration="yes" />

  <xsl:template match="/">
    <xsl:apply-templates select="//evaluationdefinition" />
  </xsl:template>

  <xsl:template match="evaluationdefinition">
    <html>
      <head>
        <title>
          <xsl:apply-templates select="//placeholdervalues">
            <xsl:with-param name="name">
              <xsl:text>Title</xsl:text>
            </xsl:with-param>
          </xsl:apply-templates>
        </title>
        <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="format-detection" content="telephone=no" />        
        <link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css' />

        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>

        <style type="text/css">
          <xsl:value-of select="//theme"/>
        </style>

        <xsl:comment><![CDATA[[if gt IE 6]>
         <style type="text/css">
            .gridContain .gridAnswers {
              display: none;
            }
            .gridCell label {
              display: inline-block;
            }
            .gridCell {
              text-align: left;
            }
          </style>

   <![endif]]]>
     
   </xsl:comment>

        <style type="text/css">
          html, body {
  font-family: 'Roboto', sans-serif;
  font-size:0.9em;
  height: 100%;
  margin: 0;
  padding: 0;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

h1,h2,h3,h4,h5,h6 {
  font-weight: 400;
}

body {
  box-sizing: border-box;
}
li {
  list-style-type:none;
  margin-bottom:8px;
}
a {
  text-decoration: none;
  color: #111;
}
ul {
  margin:0;
  padding: 0;
}
label {
  padding-left: 10px;
  cursor:pointer;
}
img {
  max-width: 100%;
  height: auto;
}
.imageLogo {
  box-sizing: border-box;
  padding: 0 15px;
}
.container {
  max-width: 1024px;
  margin: 0 auto;
  padding-bottom: 5px;
}
.center {
  text-align:center;
}
.pad-none {
  padding: 0;
}
.margin-btm-sm {
margin-bottom: 10px;
}
.spaceCenter {
  margin-top: 30px;
  text-align: center;
}
.collection {
  border: 1px solid #e0e0e0;
  border-radius: 2px;
  margin:20px auto;
  padding:0;
  max-width:800px;
}
.collection li {
  border-bottom: 1px solid #e0e0e0;
  padding: 10px 20px;
  cursor: pointer;
  transition:0.25s;
}
.collection li:last-child {
  border-bottom: 0;
}
.collection li:hover {
  background-color: #ddd;
}
.survey-container {
  background-color: #fff;
  box-shadow: 0 0 5px #777;
  margin: 15px;
}
.survey-title {
  text-align: center;
  padding: 12px;
  background-color: #f3f3f3;
  border-bottom: 1px solid #e7e7e7;
}
.survey-footer{
  padding: 12px 0;
  background-color: #f3f3f3;
  border-top: 1px solid #e7e7e7;
  text-align: center;
  margin-bottom: 30px;
}
.btn-submit {
  border-radius:2px;
  color: #282828;
  padding: 7px 20px;
  outline:none;
  background-color: #f7f7f7;
  cursor:pointer;
  font-size: 18px;
  font-weight:400;
  font-family:'Roboto', sans-serif;
  text-transform:uppercase;
  border:2px solid #282828;
  transition: all .25s;
}
.btn-submit:focus,
.btn-submit:active,
.btn-submit:hover {
  background-color: #282828;
  color: #fff;
}

.survey-content {
  padding:20px 30px;
}
.question {
  margin-bottom: 10px;
}
.qContain {
        position: relative;
  margin-bottom: 30px;
}
textarea,
input[type="text"] {
  background: none;
  background-color: #f3f3f3;
  border: 2px solid #d5d5d5;
  border-radius: 0;
  box-shadow: none;
  color: #555;
  height: 44px;
  font-size: 16px;
  font-weight: 400;
  font-family: sans-serif;
  margin-bottom: 25px;
  padding: 6px 12px;
  box-sizing:border-box;
}
textarea:focus,
input[type="text"]:focus {
  background-color: #fefefe;
  box-shadow: none;
  color: #333;
  border-color: #66afe9;
  outline:0;
}
.gridCell input[type="checkbox"]:not(old),
.gridCell input[type="radio"]:not(old),
.pick-one-many input[type="checkbox"]:not(old),
.pick-one-many input[type="radio"]:not(old) {
  width: 28px;
  margin: 0;
  padding: 0;
  opacity: 0;
  cursor:pointer;
}
.gridCell input[type="checkbox"]:not(old) + label,
.gridCell input[type="radio"]:not(old) + label,
.pick-one-many input[type="checkbox"]:not(old) + label,
.pick-one-many input[type="radio"]:not(old) + label {
  background: url('') no-repeat 0 0;
  display:inline-block;
  margin-left:-28px;
  padding-left: 28px;
  line-height: 24px;
  background-position-y: -45px;
  height: 27px;
}

.gridCell input[type="checkbox"]:not(old) + label,
.pick-one-many input[type="checkbox"]:not(old) + label {
  background-position-y: 3px;
}

.gridCell input[type="radio"]:not(old):checked + label,
.pick-one-many input[type="radio"]:not(old):checked + label {
  background-position-y: -70px;
}
.gridCell input[type="checkbox"]:not(old):checked + label,
.pick-one-many input[type="checkbox"]:not(old):checked + label {
  background-position-y: -21px;
}
[data-require-if="yes"]:after {
  color:#e34f4f;
  content: " *";
}

.gridRow[data-require-if="yes"]:after {
  content: "";
}

.gridRow[data-require-if="yes"] .gridrowlegend:after {
  color:#e34f4f;
  content: " *";
}
.hide-horizontal {
	display: none;
}
textarea {
  width: 100%;
  height:100px;
  max-width:525px;
  min-width:50%;
  padding: 10px 12px;
}

/*Grid Questions*/
.gridRow {
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-align-items:center;
      -ms-flex-align:center;
          align-items:center;
  border-bottom: 1px solid #e0e0e0;
  padding:5px 0;
}
.gridCell {
  -webkit-flex: 1 1 0px;
      -ms-flex: 1 1 0px;
          flex: 1 1 0px;
  text-align: center;
  padding: 5px;
}
.gridRow .gridCell:first-child {
  -webkit-flex: 1 1 41%;
      -ms-flex: 1 1 41%;
          flex: 1 1 41%;
  text-align:left;
}

.visible-sm-inlineBlk {
  display: none;
}

.gridAnswers {
  font-size: 12px;
  font-size: 1vw;
}

.gridContain {
  margin-bottom: 50px;
}

.gridContain .gridAnswers {
  padding-top: 0;
}

.gridGuide {
  border-bottom: 0;
}

.thanks-page {
  display:none;
  max-width: 97%;
  margin:auto;
  position:absolute;
  bottom:0;
  top:25%;
  left: 0;
  right: 0;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
}
.thanks-page .survey-title {
  max-width: 1024px;
  margin: auto;
}

.fadeIn {
  display:block;
  opacity: 1;
}

label.errorBottom {
  font-size: 11px;
  position: absolute;
  bottom: -2px;
  left:0;
  z-index: 99;
  height: 25px;
  line-height: 25px;
  background-color: #e34f4f;
  color: #fff;
  font-weight: normal;
  padding: 0 6px;
}

label.errorBottom:before {
  content: '';
  position: absolute;
  border-style: solid;
  border-width: 6px 0 0 6px;
  border-color: transparent #e34f4f;
  display: block;
  width: 0;
  z-index: 1;
  top: -6px;
  left: 20%;
}
label.errorTop {
  font-size: 11px;
  position: absolute;
  top: -28px;
  left:0;
  z-index: 99;
  height: 25px;
  line-height: 25px;
  background-color: #e34f4f;
  color: #fff;
  font-weight: normal;
  padding: 0 6px;
}

label.errorTop:after {
  content: '';
  position: absolute;
  border-style: solid;
  border-width: 0 6px 6px 0;
  border-color: transparent #e34f4f;
  display: block;
  width: 0;
  z-index: 1;
  bottom: -6px;
  left: 20%;
}
.section {
  position: relative;
}

.asterisk {
width: 0;
  color:#e34f4f;
  display:inline-block;
}

.checkMaxPick .disabled+label {
  opacity: 0.6;
}

.additionalText {
  font-size:1.5em;
}

/*Responsive Stuff ------------------------------------- */

@media all and (min-width: 1300px){
  .gridAnswers {
    font-size: 14px;
  }
}

/* Phones */
@media all and (max-width: 945px){
  .gridAnswers {
    display:none;
  }
  .gridRow {
    -webkit-flex-wrap: wrap;
        -ms-flex-wrap: wrap;
            flex-wrap: wrap;
  }
  .gridRow .gridCell:first-child,
  .gridCell {
    -webkit-flex: 1 1 100%;
        -ms-flex: 1 1 100%;
            flex: 1 1 100%;
    text-align:left;
  }
	.hide-horizontal,
  .visible-sm-inlineBlk {
    display:inline-block;
  }
}
        </style>

      </head>

      <body>
    <xsl:variable name="documentstyle">
      <xsl:apply-templates select="//placeholdervalues">
        <xsl:with-param name="name">
          <xsl:text>documentstyle</xsl:text>
        </xsl:with-param>
      </xsl:apply-templates>
    </xsl:variable>
    <xsl:if test="$documentstyle != ''">
      <xsl:attribute name="style">
        <xsl:value-of select="$documentstyle"/>
      </xsl:attribute>
    </xsl:if>

    <div class="container">
      <div class="row center">
        <xsl:variable name="imagelogo">
          <xsl:apply-templates select="//placeholdervalues">
            <xsl:with-param name="name">
              <xsl:text>imagelogo</xsl:text>
            </xsl:with-param>
          </xsl:apply-templates>
        </xsl:variable>

        <xsl:if test="$imagelogo != ''">
          <img class="imageLogo">


                  <xsl:if test="$imagelogo != ''">
                    <xsl:attribute name="src">
                      <xsl:value-of select="$imagelogo"/>
                    </xsl:attribute>
                  </xsl:if>

                  <xsl:variable name="imagelogostyle">
                    <xsl:apply-templates select="//placeholdervalues">
                      <xsl:with-param name="name">
                        <xsl:text>imagelogostyle</xsl:text>
                      </xsl:with-param>
                    </xsl:apply-templates>
                  </xsl:variable>

                  <xsl:if test="$imagelogostyle != ''">
                    <xsl:attribute name="style">
                      <xsl:value-of select="$imagelogostyle" />
                    </xsl:attribute>
                  </xsl:if>
              </img>
          </xsl:if>
      </div>

      <div class="survey-container" id="evalPage">
        <div class="row survey-title">
          <h1 class="EvalTitle">
            Evaluation Title
          </h1>

          <h2 class="heading2">
            <xsl:variable name="heading2style">
              <xsl:apply-templates select="//placeholdervalues">
                <xsl:with-param name="name">
                  <xsl:text>heading2style</xsl:text>
                </xsl:with-param>
              </xsl:apply-templates>
            </xsl:variable>

            <xsl:if test="$heading2style != ''">
              <xsl:attribute name="style">
                <xsl:value-of select="$heading2style" />
              </xsl:attribute>
            </xsl:if>

            <xsl:apply-templates select="//placeholdervalues">
              <xsl:with-param name="name">
                <xsl:text>Heading2</xsl:text>
              </xsl:with-param>
            </xsl:apply-templates>

          </h2>

          <h3 class="heading3">
            <xsl:variable name="heading3style">
              <xsl:apply-templates select="//placeholdervalues">
                <xsl:with-param name="name">
                  <xsl:text>heading3style</xsl:text>
                </xsl:with-param>
              </xsl:apply-templates>
            </xsl:variable>

            <xsl:if test="$heading3style != ''">
              <xsl:attribute name="style">
                <xsl:value-of select="$heading3style" />
              </xsl:attribute>
            </xsl:if>

            <xsl:apply-templates select="//placeholdervalues">
              <xsl:with-param name="name">
                <xsl:text>Heading3</xsl:text>
              </xsl:with-param>
            </xsl:apply-templates>
          </h3>
        </div>

        <form method="post" data-ajax="false" class="survey-form" id="eval">
          <xsl:attribute name="action">
              <xsl:value-of select="//actionurl"/>
          </xsl:attribute>

          <xsl:variable name="codevalue">
          	<xsl:apply-templates select="//placeholdervalues">
          		<xsl:with-param name="name">codevalue</xsl:with-param>
          	</xsl:apply-templates>
          </xsl:variable>

          <xsl:if test="$codevalue != ''">
          	<input type="hidden" name="xxcodenamexx" id="xxcodenamexx" data-role="none">
          		<xsl:attribute name="value">
					<xsl:value-of select="$codevalue" />
				</xsl:attribute>
          	</input>
          </xsl:if>

          <div class="survey-content">
            <xsl:for-each select="group | grid | picklist | field | rank | textnode">
                <div class="section">
                  <xsl:apply-templates select="." />
                </div>
            </xsl:for-each>
          </div>

          <div class="survey-footer submitbutton">
            <button type="submit" class="btn-submit">
				      Submit
            </button>
          </div>
        </form>
      </div>

      <div class="row center">
        <h2>
          <xsl:variable name="footer2style">
            <xsl:apply-templates select="//placeholdervalues">
              <xsl:with-param name="name">
                <xsl:text>footer2style</xsl:text>
              </xsl:with-param>
            </xsl:apply-templates>
          </xsl:variable>

          <xsl:if test="$footer2style != ''">
            <xsl:attribute name="style">
              <xsl:value-of select="$footer2style"/>
            </xsl:attribute>
          </xsl:if>

          <xsl:apply-templates select="//placeholdervalues">
            <xsl:with-param name="name">
              <xsl:text>Footer2</xsl:text>
            </xsl:with-param>
          </xsl:apply-templates>
        </h2>

        <a class="privacylink" target="_blank">
          <xsl:variable name="PrivacyUrl">
            <xsl:apply-templates select="//placeholdervalues">
              <xsl:with-param name="name">
                <xsl:text>PrivacyUrl</xsl:text>
              </xsl:with-param>
            </xsl:apply-templates>
          </xsl:variable>
          <xsl:if test="$PrivacyUrl != ''">
            <xsl:attribute name="href">
              <xsl:value-of select="$PrivacyUrl"/>
            </xsl:attribute>
          </xsl:if>

          <xsl:variable name="privacylink1style">
            <xsl:apply-templates select="//placeholdervalues">
              <xsl:with-param name="name">
                <xsl:text>privacylink1style</xsl:text>
              </xsl:with-param>
            </xsl:apply-templates>
          </xsl:variable>

          <xsl:if test="$privacylink1style != ''">
            <xsl:attribute name="style">
              <xsl:value-of select="$privacylink1style"/>
            </xsl:attribute>
          </xsl:if>

          <xsl:apply-templates select="//placeholdervalues">
            <xsl:with-param name="name">
              <xsl:text>PrivacyText</xsl:text>
            </xsl:with-param>
          </xsl:apply-templates>
        </a>
      </div>

    </div>

    <div class="container thanks-page">
      <div class="survey-container survey-title">
        <h1>
            <xsl:apply-templates select="//placeholdervalues">
              <xsl:with-param name="name">
                <xsl:text>ThankYouMessage</xsl:text>
              </xsl:with-param>
              <xsl:with-param name="default">
                <xsl:text>Thank you for your feedback!</xsl:text>
              </xsl:with-param>
            </xsl:apply-templates>
        </h1>
      </div>
    </div>

      </body>
    </html>
  </xsl:template>

  <xsl:template match="grid">
    <xsl:variable name="gridid" select="@id" />
  <div class="qContain">
      <h3 class="question"><xsl:apply-templates select="title" /></h3>
      <div class="gridContain" id="{$gridid}">
        <xsl:if test="scale/left and scale/right">
          <div class="gridRow gridAnswers gridGuide">
            <div class="gridCell"></div>
            <xsl:for-each select="columns/column">
              <xsl:choose>
                <xsl:when test="position()=1">
                  <div class="gridCell">
                    <xsl:value-of select="../../scale/left"/>
                  </div>
                </xsl:when>
                <xsl:when test="position()=last()">
                  <div class="gridCell">
                    <xsl:value-of select="../../scale/right"/>
                  </div>
                </xsl:when>
                <xsl:otherwise>
                  <div class="gridCell"></div>
                </xsl:otherwise>
              </xsl:choose>
            </xsl:for-each>
          </div>
        </xsl:if>

        <div class="gridRow gridAnswers">
          <div class="gridCell"></div>
        <xsl:for-each select="columns/column">
          <div class="gridCell">
            <xsl:value-of select="." />
          </div>
        </xsl:for-each>
        </div>

        <xsl:for-each select="rows/row">
          <xsl:variable name="condition">
            <xsl:choose>
              <xsl:when test="@conditional != ''">
                <xsl:apply-templates select="//placeholdervalues">
                  <xsl:with-param name="name">
                    <xsl:value-of select="@conditional"/>
                  </xsl:with-param>
                </xsl:apply-templates>
              </xsl:when>
              <xsl:otherwise>
                <xsl:text>NO</xsl:text>
              </xsl:otherwise>
            </xsl:choose>
          </xsl:variable>

          <xsl:if test="$condition != ''">
          <div class="gridRow">
             <xsl:if test="@requireif">
              <xsl:attribute name="data-require-if">
                <xsl:value-of select="@requireif"/>
              </xsl:attribute>
            </xsl:if>
            <xsl:variable name="rowid" select="@id" />
            <div class="gridCell">
              <span class="gridrowlegend">
                    <xsl:choose>
                      <xsl:when test="rendertext">
                        <xsl:apply-templates select="rendertext" />
                      </xsl:when>
                      <xsl:otherwise>
                        <xsl:apply-templates select="." />
                      </xsl:otherwise>
                    </xsl:choose>
                  </span>
            </div>

            <xsl:for-each select="../../columns/column">
                  <div class="gridCell">
                    <input type="radio" name="{$gridid}_{$rowid}__o" id="{$gridid}_{$rowid}_{@id}" value="{$gridid}_{$rowid}_{@id}" data-role="none" />
                    <label class="" for="{$gridid}_{$rowid}_{@id}">
                    	<span class="hide-horizontal">
                      <xsl:value-of select="." />
                  </span>
                    </label>
                  </div>
                </xsl:for-each>
          </div>
          </xsl:if>
        </xsl:for-each>
      </div>
  </div>
  </xsl:template>

  <xsl:template match="rank">
    <p class="ranktitle">
      <xsl:apply-templates select="title" />
    </p>

    <xsl:for-each select="rankfields/rankfield">

      <xsl:variable name="rankfieldid" select="@id" />

      <div data-role="fieldcontainer">
        <label for="{$rankfieldid}__o" class="rankfield">
          <xsl:apply-templates select="." />
        </label>

        <select name="{$rankfieldid}__o" id="{$rankfieldid}__o">
          <option value=""></option>
          <xsl:for-each select="../../options/option">
            <option value="{$rankfieldid}_{@id}">
              <xsl:apply-templates select="." />
            </option>
          </xsl:for-each>
        </select>
      </div>
    </xsl:for-each>
  </xsl:template>

  <xsl:template match="picklist">
    <xsl:variable name="prompt">
      <xsl:choose>
        <xsl:when test="rendertext">
          <xsl:apply-templates select="rendertext" />
        </xsl:when>
        <xsl:otherwise>
          <xsl:apply-templates select="text" />
        </xsl:otherwise>
      </xsl:choose>
    </xsl:variable>

    <!-- Determine pickone/many -->
    <xsl:choose>
      <xsl:when test="@multiple='yes'">
        <div class="qContain pick-one-many">
          <h3 class="question pickmanylegend">
            <xsl:if test="@requireif">
              <xsl:attribute name="data-require-if">
                <xsl:value-of select="@requireif"/>
              </xsl:attribute>
            </xsl:if>
              <xsl:copy-of select="$prompt"/>
          </h3>
          <ul>
             <xsl:if test="@maxpick">
              <xsl:attribute name="data-max-pick">
                <xsl:value-of select="@maxpick"/>
              </xsl:attribute>
              <xsl:attribute name="class">checkMaxPick</xsl:attribute>
            </xsl:if>
            <xsl:for-each select="options/option">
              <li>
                <input type="checkbox" name="{../../@id}__o" id="{@id}" value="{@id}" />
                <label for="{@id}">
                  <xsl:apply-templates select="." />
                </label>
            </li>
            </xsl:for-each>
          </ul>
      </div>
     </xsl:when>

      <xsl:otherwise>
        <div class="qContain pick-one-many">
          <h3 class="pickonelegend question">
              <xsl:if test="@requireif">
                <xsl:attribute name="data-require-if">
                  <xsl:value-of select="@requireif"/>
                </xsl:attribute>
              </xsl:if>
              <xsl:copy-of select="$prompt"/>
          </h3>
          <ul>
          <xsl:for-each select="options/option">
            <li>
            <input type="radio" name="{../../@id}__o" id="{@id}" value="{@id}" />
            <label for="{@id}">
              <xsl:variable name="optiondivstyle">
                <xsl:apply-templates select="//placeholdervalues">
                  <xsl:with-param name="name">
                    <xsl:value-of select="concat(@id, '.image.div.style')"/>
                  </xsl:with-param>
                </xsl:apply-templates>
              </xsl:variable>

              <xsl:choose>
                <xsl:when test="$optiondivstyle!=''">
                  <div>
                    <xsl:attribute name="style">
                      <xsl:value-of select="$optiondivstyle"/>
                    </xsl:attribute>
                  </div>
                </xsl:when>
                <xsl:otherwise>
                  <xsl:apply-templates select="." />
                </xsl:otherwise>
              </xsl:choose>
            </label>
          </li>
          </xsl:for-each>
         </ul>
        </div>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>


  <xsl:template match="field">
    <div class="qContain">
    <h3 class="margin-btm-sm">
      <label for="{@id}" class="pad-none">
        <xsl:if test="@requireif">
          <xsl:attribute name="data-require-if">
            <xsl:value-of select="@requireif"/>
          </xsl:attribute>
        </xsl:if>
        <span class="fieldlabel">
          <xsl:choose>
            <xsl:when test="rendertext">
              <xsl:apply-templates select="rendertext" />
            </xsl:when>
            <xsl:otherwise>
              <xsl:apply-templates select="text" />
            </xsl:otherwise>
          </xsl:choose>
        </span>
      </label>
  </h3>
    <xsl:choose>
      <xsl:when test="@textmode='multiple'">
        <textarea name="{@id}" id="{@id}" value="">
        <xsl:if test="@requireif">
          <xsl:attribute name="data-require-if">
            <xsl:value-of select="@requireif"/>
          </xsl:attribute>
        </xsl:if>
        </textarea>
      </xsl:when>
      <xsl:when test="@textmode='password'">
        <input type="password" name="{@id}" id="{@id}" value="">
        <xsl:if test="@requireif">
          <xsl:attribute name="data-require-if">
            <xsl:value-of select="@requireif"/>
          </xsl:attribute>
        </xsl:if>
        </input>
      </xsl:when>
      <xsl:when test="@textmode='email'">
        <input type="email" name="{@id}" id="{@id}" value="">
        <xsl:if test="@requireif">
          <xsl:attribute name="data-require-if">
            <xsl:value-of select="@requireif"/>
          </xsl:attribute>
        </xsl:if>
        </input>
      </xsl:when>
      <xsl:when test="@textmode='tel'">
        <input type="tel" name="{@id}" id="{@id}" value="">
        <xsl:if test="@requireif">
          <xsl:attribute name="data-require-if">
            <xsl:value-of select="@requireif"/>
          </xsl:attribute>
        </xsl:if>
        </input>
      </xsl:when>
      <xsl:otherwise>
        <input type="text" name="{@id}" id="{@id}" value="">
        <xsl:if test="@requireif">
          <xsl:attribute name="data-require-if">
            <xsl:value-of select="@requireif"/>
          </xsl:attribute>
        </xsl:if>
        </input>
      </xsl:otherwise>
    </xsl:choose>
    </div>
  </xsl:template>

  <xsl:template match="group">

  <xsl:variable name="groupid" select="@id" />

    <h2 id="{$groupid}" class="grouptitle">
      <xsl:apply-templates select="title" />
    </h2>
    <xsl:apply-templates select="field | picklist | grid" />
  </xsl:template>

  <xsl:template match="modes">
    <xsl:choose>
      <xsl:when test="mode[@type='display']/culture[@code = /evaluation/culture/@code]">
        <xsl:apply-templates select="mode[@type='display']/culture[@code = /evaluation/culture/@code]" />
      </xsl:when>
      <xsl:when test="mode[@type='display']/culture[@code = substring-before(/evaluation/culture/@code,'-')]">
        <xsl:apply-templates select="mode[@type='display']/culture[@code = substring-before(/evaluation/culture/@code,'-')]" />
      </xsl:when>
      <xsl:when test="mode[@type='display']/culture[@code='' or not(@code)]">
        <xsl:apply-templates select="mode[@type='display']/culture[@code='' or not(@code)]"/>
      </xsl:when>
      <xsl:otherwise>
        <xsl:apply-templates select="mode[@type='display']/culture[1]"/>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <xsl:template match="placeholdervalues">
    <xsl:param name="name" />
    <xsl:param name="default" />
    <xsl:choose>
      <xsl:when test="placeholdervalue[@name=$name and @culture=/evaluation/culture/@code]">
        <xsl:value-of select="placeholdervalue[@name=$name and @culture=/evaluation/culture/@code]"/>
      </xsl:when>
      <xsl:when test="placeholdervalue[@name=$name and @culture = substring-before(/evaluation/culture/@code,'-')]">
        <xsl:value-of select="placeholdervalue[@name=$name and @culture= substring-before(/evaluation/culture/@code,'-')]"/>
      </xsl:when>
      <xsl:when test="placeholdervalue[@name=$name and (@culture='' or not(@culture))]">
        <xsl:value-of select="placeholdervalue[@name=$name and (@culture='' or not(@culture))]"/>
      </xsl:when>
      <xsl:when test="placeholdervalue[@name=$name][1]">
        <xsl:value-of select="placeholdervalue[@name=$name][1]"/>
      </xsl:when>
      <xsl:otherwise>
        <xsl:value-of select="$default" />
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <xsl:template match="placeholder">
    <xsl:variable name="culture" select="../@code" />
    <xsl:variable name="name" select="@name" />
    <xsl:choose>
      <xsl:when test="//placeholdervalue[@name=$name and @culturecode=$culture] != ''">
        <xsl:value-of select="//placeholdervalue[@name=$name and @culturecode=$culture]"/>
      </xsl:when>
      <xsl:when test="//placeholdervalue[@name=$name and (@culturecode='' or not(@culturecode))]" >
        <xsl:value-of select="//placeholdervalue[@name=$name and (@culturecode='' or not(@culturecode))]"/>
      </xsl:when>
      <xsl:when test="//placeholdervalue[@name=$name][1]">
        <xsl:value-of select="//placeholdervalue[@name=$name][1]"/>
      </xsl:when>
      <xsl:otherwise>
        [ MISSING PLACEHOLDER <xsl:value-of select="$name"/> ]
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>


  <xsl:template match="styletext">
    <xsl:choose>
      <xsl:when test="@class and @link">
         <a target="_blank">
            <xsl:attribute name="href">
              <xsl:value-of select="@link"/>
            </xsl:attribute>
            <xsl:attribute name="class">
              <xsl:value-of select="@class"/>
            </xsl:attribute>
            <xsl:value-of select="." />
         </a>
      </xsl:when>
      <xsl:when test="@link">
        <a target="_blank">
            <xsl:attribute name="href">
              <xsl:value-of select="@link"/>
            </xsl:attribute>          
            <xsl:value-of select="." />
         </a>
      </xsl:when>
      <xsl:otherwise>
        <span>
          <xsl:attribute name="class">
              <xsl:value-of select="@class"/>
            </xsl:attribute>
            <xsl:value-of select="." />
        </span>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <xsl:template match="textnode">
    <h3 class="additionalText">
      <xsl:apply-templates select="title" />
    </h3>
  </xsl:template>


</xsl:stylesheet>