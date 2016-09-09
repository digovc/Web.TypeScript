echo "Copiando os arquivos das bibliotecas externas de javascript para a pasta de debug."

xcopy "$(ProjectDir)lib\*.*" "$(SolutionDir)principal\bin\$(ConfigurationName)\res\js\lib\" /y/d/s

::::::::::::::::::::::::::::::::::::::::::::::::::

if $(ConfigurationName) == Debug echo "Copiando os arquivos javascript para a pasta de debug."

if $(ConfigurationName) == Debug xcopy "$(TargetDir)js\*.*" "$(SolutionDir)principal\bin\$(ConfigurationName)\res\js\web\" /y/d/s