let HookFunctions = SELECT FROM OFunction WHERE name = 'DashboardBoxTypeFunction';

if ($HookFunctions.size() == 0) {
  console.log "Create functions"

  CREATE FUNCTION DashboardBoxTypeFunction "var boxTypeRid = doc.field('@rid'); boxTypeRid = String(boxTypeRid); var functionName = boxTypeRid.replace(/#/g, ''); functionName = functionName.replace(/:/g, '_'); functionName = 'DashboardBoxTypeFunction_' + functionName; db.executeCommand('DELETE FROM OFunction WHERE name = \"'+ functionName +'\"'); code = doc.field('code'); if (code != '') { code = code.replace(/'/g, \"\\'\"); code = code.replace(/\"/g, '\\\\\"'); db.executeCommand('CREATE FUNCTION '+ functionName +' \"'+ code +'\" IDEMPOTENT true LANGUAGE JavaScript'); db.executeCommand('UPDATE DashboardBoxType SET onAfterUpdate = \"'+ functionName +'\" WHERE @rid = '+ boxTypeRid); print('Update'); }" LANGUAGE Javascript
  CREATE FUNCTION DashboardBoxTypeDeleteFunction "var boxTypeRid = doc.field('@rid'); boxTypeRid = String(boxTypeRid); var functionName = boxTypeRid.replace(/#/g, ''); functionName = functionName.replace(/:/g, '_'); functionName = 'DashboardBoxTypeFunction_' + functionName; db.executeCommand('DELETE FROM OFunction WHERE name = \"'+ functionName +'\"');" LANGUAGE Javascript

  ALTER CLASS DashboardBoxType CUSTOM onAfterUpdate = DashboardBoxTypeFunction;
  ALTER CLASS DashboardBoxType CUSTOM onAfterDelete=DashboardBoxTypeDeleteFunction

  console.log "End create functions"
}